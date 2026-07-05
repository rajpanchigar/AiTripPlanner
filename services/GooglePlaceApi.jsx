export const getPhotoRef = async(placeName) =>{
    const response = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+placeName+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY);


    const result = response.json();
    return result;
    console.log(result);
}