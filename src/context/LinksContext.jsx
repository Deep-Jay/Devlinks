import { useEffect, useReducer } from "react";

import { LinksContext } from "./LinksContextInstance.jsx";

const initialState = {
  links: (() => {
    try {
      const savedLinks = localStorage.getItem("links");
      if (savedLinks !== null) return JSON.parse(savedLinks);
      return [];
    } catch {
      return [];
    }
  })(),
};

function linksReducer(state, action) {
  switch (action.type) {
    case "DELETE_LINK":
      return {
        ...state,
        links: state.links.filter((link) => link.id !== action.payload),
      };

    case "TOGGLE_LINK":
      return {
        ...state,
        links: state.links.map((link) =>
          link.id === action.payload
            ? { ...link, visible: !link.visible }
            : link,
        ),
      };

    case "ADD_LINK": {
      const data = {
        ...action.payload,
        icon: action.payload.icon || "🔗",
        visible: true,
      };
      return {
        ...state,
        links: [...state.links, { id: Date.now(), ...data }],
      };
    }

    case "UPDATE_LINK":
      return {
        ...state,
        links: state.links.map((link) =>
          link.id === action.payload.id
            ? { ...link, ...action.payload.fields }
            : link,
        ),
      };

    case "REORDER_LINKS":
      return {
        ...state,
        links: action.payload, // payload is the already-reordered array
      };

    default:
      return state;
  }
}

export function LinksProvider({ children }) {
  const [state, dispatch] = useReducer(linksReducer, initialState);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(state.links));
  }, [state.links]);

  const actions = {
    deleteLink: (id) => ({ type: "DELETE_LINK", payload: id }),
    toggleLink: (id) => ({ type: "TOGGLE_LINK", payload: id }),
    addLink: (link) => ({ type: "ADD_LINK", payload: link }),
    updateLink: (id, fields) => ({
      type: "UPDATE_LINK",
      payload: { id: id, fields: fields },
    }),
    reorderLinks: (array) => ({ type: "REORDER_LINKS", payload: array }),
  };

  const handleDelete = (id) => {
    dispatch(actions.deleteLink(id));
  };

  const handleToggle = (id) => {
    dispatch(actions.toggleLink(id));
  };

  const handleAdd = (fields) => {
    dispatch(actions.addLink(fields));
  };

  const checkDuplicateURL = (url) => {
    return state.links.find((link) => link.url === url);
  };

  const handleUpdate = (id, fields) => {
    dispatch(actions.updateLink(id, fields));
  };

  const reorderLinks = (reorderedLinks) => {
    dispatch(actions.reorderLinks(reorderedLinks));
  };

  const value = {
    links: state.links,
    handleDelete,
    handleAdd,
    handleToggle,
    handleUpdate,
    checkDuplicateURL,
    reorderLinks,
  };

  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  );
}
