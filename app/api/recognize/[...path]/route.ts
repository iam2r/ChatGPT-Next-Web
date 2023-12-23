import { getServerSideConfig } from "@/app/config/server";

const handle = async (req: Request) => {
  const formData = await req.formData();
  const { GOOGLE_GEMININ_API_KEY } = getServerSideConfig();
  return fetch("https://openai-iamrazo.koyeb.app/recognize", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${GOOGLE_GEMININ_API_KEY}`,
    },
  });
};

export const POST = handle;
export const GET = handle;
export const OPTIONS = handle;
