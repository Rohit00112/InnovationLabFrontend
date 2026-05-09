export const GET = async () => {
  try {
    const response = await fetch(
      (process.env.BACKEND_API_BASE_URL + "/api/v1/Companies") as string,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return Response.json(
        {
          success: false,
          error: {
            code: "FETCH_FAILED",
            message: "Failed to fetch data.",
          },
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        },
      },
      { status: 500 },
    );
  }
};
