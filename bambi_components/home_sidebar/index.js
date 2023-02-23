const HomeSidebar = () => {
    return(`
   <div class="col-5 float-end">
        <div class="row">
            <h1>NAME OF WEBSITE</h1>
            <h6>Description of why we made this website...</h6>
        </div>
        <div class="row pt-4">
            <h3>Looking for Something?</h3>
            <!-- Search Bar: Replace link with reference to search page-->
            <button class="btn btn-primary" href="#">Search</button>
        </div>
        <div class="row pt-4">
        <!-- Placeholder will be replaced with most recent post if logged in and random content if not -->
            <img src="./images/placeholder.jpg" class="p-0 m-0 img-fluid h-25" alt="placeholder image">
        </div>
        <div class="row pt-5">
            <h2>Join OUR community!</h2>
            <button class="btn btn-primary" href="#">Sign Up/Log In</button>
        </div>
   </div>
 `);
}
export default HomeSidebar;