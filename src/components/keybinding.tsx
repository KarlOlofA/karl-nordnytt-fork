"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

const Keybindings = ({stories, story}: {stories:number[], story?: number}) => {
  const router = useRouter();
  let sequence:string[] = [];
  let timeout:any = null;

  const keypress = (e:KeyboardEvent) => {
    sequence.push(e.key)

    // Debounce handler
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      const keys = sequence.join("");
      sequence = [];

      if (keys == "h" || keys == "0") {
        router.push("/");
      }
      else if (keys == "n") {
        const index = stories.indexOf(story!)+1;
        if (stories[index])
          router.push("/"+stories[index]);
      }
      else if (keys == "p") {
        const index = stories.indexOf(story!)-1
        if (stories[index])
          router.push("/"+stories[index]);
      }
      else {
        const position = parseInt(keys)
        if (stories[position-1])
          router.push("/"+stories[position-1])
      }
    }, 350)
  };

  useEffect(() => {
    window.addEventListener("keypress", keypress)
    return () => {
      window.removeEventListener("keypress", keypress)
    }
  })

  return null;
}

export default Keybindings;