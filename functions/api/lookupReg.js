export async function onRequestPost(context) {

  try {

    const body = await context.request.json();

    const reg =
      body.reg
        .replace(/\s/g, "")
        .toUpperCase();

    const response = await fetch(
      "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
      {
        method: "POST",
        headers: {
          "x-api-key": context.env.DVLA_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          registrationNumber: reg
        })
      }
    );

    if (!response.ok) {

      return Response.json(
        {
          error: "Vehicle not found"
        },
        {
          status: 404
        }
      );
    }

    const vehicle = await response.json();

    return Response.json({
      makeModel:
        `${vehicle.make} ${vehicle.yearOfManufacture || ""}`
    });

  } catch (err) {

    return Response.json(
      {
        error: err.message
      },
      {
        status: 500
      }
    );
  }
}