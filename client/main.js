document.addEventListener("DOMContentLoaded", async () => {
  const blogList = document.getElementById("blogList");

  // API  url
  const apiUrl = "https://localhost:8080/api";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.log(response.status);
    }

    const data = await response.json();

    data.forEach((post) => {
      const blogItem = document.createElement("div");
      blogItem.classList.add("blog-item");
g
      const blogTitle = document.createElement("h1");
      blogTitle.classList.add("blog-title");
      blogTitle.textContent = post.title;

      const blogBody = document.createElement("p");
      blogBody.classList.add("blog-body");
      blogBody.textContent = post.body;

      blogItem.appendChild(blogTitle);
      blogItem.appendChild(blogBody);

      blogList.appendChild(blogItem);
    });
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }
});
