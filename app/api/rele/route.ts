import prisma from "@/lib/prisma";


export async function GET() {

  let rele = await prisma.relay.findFirst();

  if (!rele) {

    rele = await prisma.relay.create({
      data: {
        status: "desligado",
        modo: "manual",
        distancia: 10
      }
    });
  }

  return Response.json(rele);
}

export async function POST(req: Request) {

  const body = await req.json();

  let rele = await prisma.relay.findFirst();

  rele = await prisma.relay.update({
    where: {
      id: rele!.id
    },
    data: {
      status: body.status,
      modo: body.modo,
      distancia: body.distancia,
     

    }
  });

  return Response.json(rele);
}