export const GET = async () => {
  try {
    const baseUrl = process.env.BACKEND_API_BASE_URL?.replace(/\/+$/, "");
    if (!baseUrl) {
      return Response.json(
        {
          success: false,
          error: {
            code: "CONFIG_ERROR",
            message: "BACKEND_API_BASE_URL is missing.",
          },
        },
        { status: 500 },
      );
    }

    const response = await fetch(`${baseUrl}/api/v1/Companies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

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
