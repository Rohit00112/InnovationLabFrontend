type CompanyApiItem = unknown;

async function fetchAllCompanies(baseUrl: string): Promise<CompanyApiItem[]> {
  const pageSize = 100; //limit
  const allCompanies: CompanyApiItem[] = [];

  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `${baseUrl}/api/v1/Companies?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }

    const pageData = (await response.json()) as CompanyApiItem[];
    if (!Array.isArray(pageData) || pageData.length === 0) {
      break;
    }

    allCompanies.push(...pageData);

    if (pageData.length < pageSize) {
      break;
    }
  }

  return allCompanies;
}

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

    const data = await fetchAllCompanies(baseUrl);

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
