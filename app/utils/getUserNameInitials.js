export const getUserInitials = (username) => {
    if (!username) return '';  // Handle empty or undefined username
  
    // Split the username into words (first name, last name, etc.)
    const nameParts = username.split(" ");
  
    // Get the first two letters from each part of the name
    return nameParts
      .map((name) => name.substring(0, 2))
      .join("")
      .toUpperCase(); // Return initials in uppercase
  };