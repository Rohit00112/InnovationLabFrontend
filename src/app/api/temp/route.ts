export const POST = async (req: Request) => {
  try {
    if (!process.env.BACKEND_API_BASE_URL) {
      throw new Error("env is undefined for backend url");
    }

    console.log(req);

    // Read incoming multipart/form-data
    const formData = await req.formData();

    // Optional: log all fields
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Forward same form data to backend
    const response = await fetch(
      process.env.BACKEND_API_BASE_URL +
        `/api/v1/Events/${formData.get("EventId")}/register`,
      {
        method: "POST",
        body: formData,
      },
    );

    const contentType = response.headers.get("content-type");

    // Handle json response
    if (contentType?.includes("application/json")) {
      const data = await response.json();

      return Response.json(data, {
        status: response.status,
      });
    }

    // Handle non-json response
    const text = await response.text();

    return new Response(text, {
      status: response.status,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
};
