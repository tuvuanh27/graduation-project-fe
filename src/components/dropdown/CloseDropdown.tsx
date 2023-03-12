import { useState, useEffect } from "react";

type closeDropdown = (el: any, initialState: boolean) => [boolean, any];

const closeDropdown: closeDropdown = (el, initialState) => {
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (el.current != null && !el.current.contains(e.target)) {
        setOpen(!open);
      }
    };

    if (open) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [open, el]);

  return [open, setOpen];
};

export default closeDropdown;
