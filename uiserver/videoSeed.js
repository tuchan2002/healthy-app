const fs = require("fs"),
  readline = require("readline");
const path = require("path");
const { QueryTypes, Op } = require("sequelize");
const {Video} = require("../uiserver/models");
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');

/*ffprobe('public/uivideos/115/115.mp4', { path: ffprobeStatic.path })
    .then((info) => {
    // get the duration of the video in seconds
    const durationInSeconds = info.streams[0].duration;
    const minutes = Math.floor(durationInSeconds / 60);
    const remainingSeconds = Math.floor(durationInSeconds % 60);
    console.log(info, `${minutes}:${remainingSeconds}`);
  })
  .catch((err) => {
    console.error(err);
  });
  return;
  */
fs.readdirSync("public/uivideos").forEach(async (folder, index) => {
    const folderContent = fs.readdirSync(path.join("public/uivideos/", folder));
    const fileStream = fs.createReadStream(path.join('public/uivideos/', folder) + "/" + folderContent[1]);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let data = {};
    let video_bodypart = [];
    let video_target = [];

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        const lineContent = line.split(": ");
        if(lineContent[0] == "kalo" || lineContent[0] == "title" || lineContent[0] == "link") {
          data[lineContent[0]] =  lineContent[1];
        }
        else if (lineContent[0] == "goal") {
          video_target = JSON.parse(lineContent[1]);
        }
        else if (lineContent[0] == "part") {
          video_bodypart = JSON.parse(lineContent[1]);
        }
    }
    //data["link"] = `http://10.0.2.2:5000/uivideos/${folder}/${folder}.mp4`;
    await ffprobe(path.join('public/uivideos/', folder) + "/" + folderContent[0], { path: ffprobeStatic.path })
    .then((info) => {
    // get the duration of the video in seconds
    const durationInSeconds = info.streams[0].duration;
    const minutes = Math.floor(durationInSeconds / 60);
    const remainingSeconds = Math.floor(durationInSeconds % 60);
    console.log(info, `${minutes}:${remainingSeconds}`);
    data["duration"] = `${minutes}:${remainingSeconds}`;
    console.log(`The duration of the video is ${durationInSeconds} seconds`);
  })
  .catch((err) => {
    console.error(err);
  });
    const video = await Video.create(data);
    await video.addBodyparts(video_bodypart);
    await video.addTargets(video_target);
  });
  
