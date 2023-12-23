import { getServerSideConfig } from "@/app/config/server";
import { readFileAsArrayBuffer } from "./helpers/filereaders";
import { ApiPath } from "@/app/constant";

export type RecognizeClient = ReturnType<typeof createRecognizeClient>;

export function createRecognizeClient() {
  return {
    async images(file: File, prompt: string = "") {
      try {
        const formData = new FormData();
        formData.append("prompt", prompt);
        formData.append("file", file);
        const res = await fetch(this.path("images"), {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          throw new Error();
        }
        const json = await res.json();
        return json.text;
      } catch (error) {
        return Promise.reject();
      }
    },

    path(path: string) {
      let url = ApiPath.Recognize as string;

      if (!url.endsWith("/")) {
        url += "/";
      }

      if (path.startsWith("/")) {
        path = path.slice(1);
      }

      return url + path;
    },
  };
}
