/**
 * Caculate consumed calorine by running activity.
 * 
 * @param {*} weight 
 * @param {*} distance 
 * @returns 
 */
export const burnedCalorineByRunning = (weight, distance) => {
    const calo = weight * distance * 0.75;
    return calo;
}