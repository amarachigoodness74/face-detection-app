const getModelData = async (
  isPublic: boolean,
  email: string,
  imageUrl: string
) => {
  try {
    let response;

    if (isPublic) {
      response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/guest-image`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: imageUrl,
          }),
        }
      );
    } else {
      response = await fetch(`${process.env.REACT_APP_API_URL}/users/image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          image: imageUrl,
        }),
      });
    }

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || "Process failed" };
    }

    return await response.json();
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred" };
  }
};

export default getModelData;
