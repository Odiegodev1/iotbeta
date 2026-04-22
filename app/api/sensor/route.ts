import prisma from "@/lib/prisma";


export async function POST(req: Request) {

  const body = await req.json();

  const log = await prisma.sensorLog.create({
    data: {
      distancia: body.distancia,
      rele: body.rele
    }
  });

  return Response.json(log);
}