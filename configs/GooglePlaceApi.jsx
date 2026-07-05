const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

export const GetPlacePhoto = async (placeName) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        "X-Goog-FieldMask": "places.photos",
      },
      body: JSON.stringify({
        textQuery: placeName,
      }),
    });

    const data = await response.json();

    console.log(data);

    const photoName = data?.places?.[0]?.photos?.[0]?.name;

    if (!photoName) return null;

    return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};