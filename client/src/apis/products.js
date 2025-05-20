const url = process.env.REACT_APP_API_URL;

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${url}/api/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, products: data.data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchOneProduct = async (id) => {
  try {
    const response = await fetch(`${url}/api/products/product_id/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, product: data.data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchTrendingProducts = async () => {
  try {
    const response = await fetch(`${url}/api/products/latest`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.statusText}`,
      };
    }

    // Only parse JSON if we got a valid response
    const data = await response.json();
    return { success: true, products: data.data };
  } catch (error) {
    console.error("Error fetching trending products:", error);
    return { success: false, error: error.message };
  }
};

export const fetchRelatedProducts = async (category) => {
  try {
    const response = await fetch(
      `${url}/api/products/related?name=${category}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, products: data.data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchProductsByCategoty = async (category) => {
  try {
    const response = await fetch(
      `${url}/api/products/category?name=${category}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.statusText}`,
      };
    }

    // Only parse JSON if we got a valid response
    const data = await response.json();
    return { success: true, products: data.data };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return { success: false, error: error.message };
  }
};
