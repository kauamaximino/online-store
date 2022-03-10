export async function getCategories() {
  try {
    const url = 'https://api.mercadolibre.com/sites/MLB/categories'
    const response = await fetch(url)
    const data = await response.json();
    return data
  } catch (error) {
    return error
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const urlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`
  const urlCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`
  const urlAll = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`
  try {
    if (categoryId && query) {
      const response = await fetch(urlAll)   
      const data = await response.json();
      return data
    } else if (query) {
      const response = await fetch(urlQuery)
      const data = await response.json();
      return data
    } else {
      const response = await fetch(urlCategory)
      const data = await response.json();
      return data
    }

  } catch (error) {
    return error
  }
}
