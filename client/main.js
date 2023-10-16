document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader");
  const loadercreatePost = document.getElementById("loadercreatePost");
  const blogList = document.getElementById("blogList");
  const postForm = document.getElementById("postForm");
  const createPostButton = document.getElementById("createPostButton");
  const postTitleInput = document.getElementById("postTitle");
  const postContentInput = document.getElementById("postContent");

  // API URLs
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  // Function to fetch and display blog posts
  const fetchBlogPosts = async () => {
    loader.style.display = "block";
    blogList.style.display = "none";
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.log(response.status);
      }

      const data = await response.json();

      data.forEach((post) => {
        const blogItem = document.createElement("div");
        blogItem.classList.add("blog-item");

        const blogTitle = document.createElement("h1");
        blogTitle.classList.add("blog-title");
        blogTitle.textContent = post.title;

        const blogBody = document.createElement("p");
        blogBody.classList.add("blog-body");

        // Limit the text to 300 characters
        blogBody.textContent =
          post.body.length > 300
            ? post.body.substring(0, 300) + "..."
            : post.body;

        blogItem.appendChild(blogTitle);
        blogItem.appendChild(blogBody);

        blogList.appendChild(blogItem);
      });
    } catch (error) {
      console.error("Error fetching blog data:", error);
    } finally {
      loader.style.display = "none";
      blogList.style.display = "grid";
    }
  };

  // Initial fetch and display of blog posts
  fetchBlogPosts();

  // Event listener for form submission
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const postTitle = postTitleInput.value;
    const postContent = postContentInput.value;

    if (!postTitle || !postContent) {
      alert("Please fill in both title and content.");
      return;
    }

    loadercreatePost.style.display = "block";
    postForm.style.display = "none";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: postTitle, body: postContent }),
      });

      if (response.ok) {
        alert("Blog post created successfully.");

        // Clear the form fields
        postTitleInput.value = "";
        postContentInput.value = "";
      } else {
        console.error("Failed to create a blog post.");
        alert("Failed to create a blog post.");
      }
    } catch (error) {
      console.error("Error creating a blog post:", error);
      alert("Failed to create a blog post.");
    } finally {
      loadercreatePost.style.display = "none";
      postForm.style.display = "block";

      //redirect to homepage
      window.location.href = "/index.html";

      // Fetch and display the updated blog posts
      blogList.innerHTML = ""; // Clear the existing content
      fetchBlogPosts();
    }
  });
});
