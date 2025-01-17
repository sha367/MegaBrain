export const lightTheme = {
  colors: {
    background: {
      primary: "#FFFFFF",    // Primary Background
      secondary: "#25292e11",  // Secondary Background
      hover: "#F1F3F4",
      popover: "#F1F3F4aa",
      input: "#FFFFFF",      // Input Field Background
      userBubble: "#E8F0FE", // Chat Bubble (User)
      botBubble: "#F1F3F4"   // Chat Bubble (Bot)
    },
    text: {
      primary: "#2E2E2E",    // Text (Primary)
      secondary: "#6D6D6D",  // Text (Secondary)
      placeholder: "#9E9E9E", // Placeholder Text
      buttonText: "#0D47A1"  // Button Text
    },
    accent: {
      main: "#1A73E8",      // Accent Color
      button: "#E3F2FD",    // Button Background
      success: "#34A853",   // Success Color
      error: "#EA4335"      // Error Color
    },
    border: {
      divider: "#E0E0E0",   // Divider/Border
      input: "#DADCE0" ,
      hover: "#DDDCE0" // Input Field Border
    },
    error: "#f44336"
  }
};

export const darkTheme = {
  colors: {
    background: {
      primary: "#343541",
      secondary: "#40414f",
      input: "#40414f",
      userBubble: "#343541",
      botBubble: "#444654"
    },
    text: {
      primary: "#ECECF1",
      secondary: "#9EA1B1",
      placeholder: "#8E8EA0",
      buttonText: "#FFFFFF"
    },
    accent: {
      main: "#19C37D",
      button: "#19C37D",
      success: "#34A853",
      error: "#EA4335"
    },
    border: {
      divider: "#4E4F60",
      input: "#4E4F60"
    },
    error: "#ef5350"
  }
};

export type Theme = typeof lightTheme; 