export async function onRequestPost(context) {

  try {

    const body = await context.request.json();

    const reg =
      body.reg
        .replace(/\s/g, "")
        .toUpperCase();

    let makeModel = body.makeModel;

    // Re-validate against DVLA
    try {

      const vehicleRes = await fetch(
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

      if (vehicleRes.ok) {

        const vehicle = await vehicleRes.json();

        makeModel =
          `${vehicle.make} ${vehicle.yearOfManufacture || ""}`;
      }

    } catch {
      // fallback to frontend value
    }

    const message =
`Hi, I'd like to book a mobile mechanic.

Car reg: ${reg}
Make/model: ${makeModel}
Issue: ${body.issue}
Postcode: ${body.postcode}
`;

    const phone = "447850257756";

    const whatsappUrl =
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return Response.json({
      whatsappUrl
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