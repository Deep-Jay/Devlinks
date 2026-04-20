import { useEffect, useContext, createContext, useReducer } from "react";

const demoLinks = [
  {
    id: 1,
    title: "GitHub",
    url: "https://github.com",
    icon: "🐙",
    visible: true,
  },
  {
    id: 2,
    title: "LinkedIn",
    url: "https://linkedin.com",
    icon: "💼",
    visible: true,
  },
  {
    id: 3,
    title: "Twitter",
    url: "https://twitter.com",
    icon: "🐦",
    visible: true,
  },
];

export const LinksContext = createContext(null);

const initialState = {
  links: (() => {
    try {
      const savedLinks = localStorage.getItem("links");
      if (savedLinks !== null) return JSON.parse(savedLinks);
      return demoLinks;
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

    case "MOVE_UP": {
      const index = state.links.findIndex((link) => link.id === action.payload);
      if (index === 0) return state;

      const updated = [...state.links]; // copy array
      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ]; // swap
      return {
        ...state,
        links: updated,
      };
    }

    case "MOVE_DOWN": {
      const index = state.links.findIndex((link) => link.id === action.payload);
      if (index === state.links.length - 1) return state;

      const updated = [...state.links];
      [updated[index + 1], updated[index]] = [
        updated[index],
        updated[index + 1],
      ];
      return {
        ...state,
        links: updated,
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

    default:
      return state;
  }
}

export function LinksProvider({ children }) {
  const [state, dispatch] = useReducer(linksReducer, initialState);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(state.links));
    document.title = `DevLinks (${state.links.length})`;
  }, [state.links]);

  const actions = {
    deleteLink: (id) => ({ type: "DELETE_LINK", payload: id }),
    toggleLink: (id) => ({ type: "TOGGLE_LINK", payload: id }),
    addLink: (link) => ({ type: "ADD_LINK", payload: link }),
    moveUp: (id) => ({ type: "MOVE_UP", payload: id }),
    moveDown: (id) => ({ type: "MOVE_DOWN", payload: id }),
    updateLink: (id, fields) => ({
      type: "UPDATE_LINK",
      payload: { id: id, fields: fields },
    }),
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

  // Move item up
  const moveUp = (id) => {
    dispatch(actions.moveUp(id));
  };

  // Move item down in array
  const moveDown = (id) => {
    dispatch(actions.moveDown(id));
  };

  const handleUpdate = (id, fields) => {
    dispatch(actions.updateLink(id, fields));
  };

  const value = {
    links: state.links,
    handleDelete,
    handleAdd,
    handleToggle,
    handleUpdate,
    moveDown,
    moveUp,
    checkDuplicateURL,
  };

  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);

  if (!context) {
    throw new Error("useLinks must be used inside LinksProvider");
  }

  return context;
}
