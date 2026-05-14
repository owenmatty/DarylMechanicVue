export async function onRequestPost(context) {

  const body = await context.request.json()

  const message =
`Hi, I'd like to book a mobile mechanic.

Car reg: ${body.reg}
Make/model: ${body.makeModel}
Issue: ${body.issue}
Postcode: ${body.postcode}
Preferred date/time: ${body.preferredDate}
`

  const phone = '447123456789'

  const whatsappUrl =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return Response.json({
    whatsappUrl
  })
}