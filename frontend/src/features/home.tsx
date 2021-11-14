import React from 'react';

const HomePage = () => {

	return (
		<>
			{/* Intro */}
			<section id="intro">
				<div className="intro-content">
					<h2>Making <span>your ideas</span><br />happen!</h2>
					<div>
						<a href="#about" className="btn-get-started scrollto">Get Started</a>
						<a href="#portfolio" className="btn-projects scrollto">Our Projects</a>
					</div>
				</div>

				<div id="intro-carousel" className="owl-carousel">
					<div className="item" style={{ backgroundImage: 'assets/img/intro-carousel/1.jpg' }}></div>
					<div className="item" style={{ backgroundImage: 'assets/img/intro-carousel/2.jpg' }}></div>
					<div className="item" style={{ backgroundImage: 'assets/img/intro-carousel/3.jpg' }}></div>
					<div className="item" style={{ backgroundImage: 'assets/img/intro-carousel/4.jpg' }}></div>
					<div className="item" style={{ backgroundImage: 'assets/img/intro-carousel/5.jpg' }}></div>
				</div>

			</section>

			{/* Main */}
			<main id="main">

				{/* About */}
				<section id="about" className="wow fadeInUp">
					<div className="container">
						<div className="row">
							<div className="about-img">
								<img src="/assets/img/about-img.jpg" alt="" />
							</div>

							<div className="col-lg-6 content">
								<h2>Lorem ipsum dolor sit amet, consectetur adipiscing</h2>
								<h3>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>

								<ul>
									<li><i className="ion-android-checkmark-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
									<li><i className="ion-android-checkmark-circle"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
									<li><i className="ion-android-checkmark-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Services */}
				<section id="services">
					<div className="container">
						<div className="section-header">
							<h2>Services</h2>
							<p>Sed tamen tempor magna labore dolore dolor sint tempor duis magna elit veniam aliqua esse amet veniam enim export quid quid veniam aliqua eram noster malis nulla duis fugiat culpa esse aute nulla ipsum velit export irure minim illum fore</p>
						</div>

						<div className="row">

							<div className="col-lg-6">
								<div className="box wow fadeInLeft">
									<div className="icon"><i className="fa fa-bar-chart"></i></div>
									<h4 className="title"><a href="">Lorem Ipsum</a></h4>
									<p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident etiro rabeta lingo.</p>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="box wow fadeInRight">
									<div className="icon"><i className="fa fa-picture-o"></i></div>
									<h4 className="title"><a href="">Dolor Sitema</a></h4>
									<p className="description">Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata nodera clas.</p>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="box wow fadeInLeft" data-wow-delay="0.2s">
									<div className="icon"><i className="fa fa-shopping-bag"></i></div>
									<h4 className="title"><a href="">Sed ut perspiciatis</a></h4>
									<p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur trinige zareta lobur trade.</p>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="box wow fadeInRight" data-wow-delay="0.2s">
									<div className="icon"><i className="fa fa-map"></i></div>
									<h4 className="title"><a href="">Magni Dolores</a></h4>
									<p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum rideta zanox satirente madera</p>
								</div>
							</div>

						</div>

					</div>
				</section>

				{/* Portfolio */}
				<section id="portfolio" className="portfolio wow fadeInUp">
					<div className="container">
						<div className="section-header">
							<h2>Our Portfolio</h2>
							<p>Sed tamen tempor magna labore dolore dolor sint tempor duis magna elit veniam aliqua esse amet veniam enim export quid quid veniam aliqua eram noster malis nulla duis fugiat culpa esse aute nulla ipsum velit export irure minim illum fore</p>
						</div>

						<div className="row">
							<div className="col-lg-12 d-flex justify-content-center">
								<ul id="portfolio-flters">
									<li data-filter="*" className="filter-active">All</li>
									<li data-filter=".filter-app">App</li>
									<li data-filter=".filter-card">Card</li>
									<li data-filter=".filter-web">Web</li>
								</ul>
							</div>
						</div>

						<div className="row portfolio-container">

							<div className="col-lg-4 col-md-6 portfolio-item filter-app">
								<img src="assets/img/portfolio/portfolio-1.jpg" className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>App 1</h4>
									<p>App</p>
									<a href="assets/img/portfolio/portfolio-1.jpg" data-gall="portfolioGallery" className="venobox preview-link" title="App 1"><i className="bx bx-plus"></i></a>
									<a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 portfolio-item filter-web">
								<img src="assets/img/portfolio/portfolio-2.jpg" className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Web 3</h4>
									<p>Web</p>
									<a href="assets/img/portfolio/portfolio-2.jpg" data-gall="portfolioGallery" className="venobox preview-link" title="Web 3"><i className="bx bx-plus"></i></a>
									<a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 portfolio-item filter-app">
								<img src="assets/img/portfolio/portfolio-3.jpg" className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>App 2</h4>
									<p>App</p>
									<a href="assets/img/portfolio/portfolio-3.jpg" data-gall="portfolioGallery" className="venobox preview-link" title="App 2"><i className="bx bx-plus"></i></a>
									<a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 portfolio-item filter-card">
								<img src="assets/img/portfolio/portfolio-4.jpg" className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Card 2</h4>
									<p>Card</p>
									<a href="assets/img/portfolio/portfolio-4.jpg" data-gall="portfolioGallery" className="venobox preview-link" title="Card 2"><i className="bx bx-plus"></i></a>
									<a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 portfolio-item filter-web">
								<img src="assets/img/portfolio/portfolio-5.jpg" className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Web 2</h4>
									<p>Web</p>
									<a href="assets/img/portfolio/portfolio-5.jpg" data-gall="portfolioGallery" className="venobox preview-link" title="Web 2"><i className="bx bx-plus"></i></a>
									<a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 portfolio-item filter-app">
								<img src="assets/img/portfolio/portfolio-6.jpg" className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>App 3</h4>
									<p>App</p>
									<a href="assets/img/portfolio/portfolio-6.jpg" data-gall="portfolioGallery" className="venobox preview-link" title="App 3"><i className="bx bx-plus"></i></a>
									<a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 portfolio-item filter-card">
								<img src="assets/img/portfolio/portfolio-7.jpg" className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Card 1</h4>
									<p>Card</p>
									<a href="assets/img/portfolio/portfolio-7.jpg" data-gall="portfolioGallery" className="venobox preview-link" title="Card 1"><i className="bx bx-plus"></i></a>
									<a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 portfolio-item filter-card">
								<img src="assets/img/portfolio/portfolio-8.jpg" className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Card 3</h4>
									<p>Card</p>
									<a href="assets/img/portfolio/portfolio-8.jpg" data-gall="portfolioGallery" className="venobox preview-link" title="Card 3"><i className="bx bx-plus"></i></a>
									<a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
								</div>
							</div>

							<div className="col-lg-4 col-md-6 portfolio-item filter-web">
								<img src="assets/img/portfolio/portfolio-9.jpg" className="img-fluid" alt="" />
								<div className="portfolio-info">
									<h4>Web 3</h4>
									<p>Web</p>
									<a href="assets/img/portfolio/portfolio-9.jpg" data-gall="portfolioGallery" className="venobox preview-link" title="Web 3"><i className="bx bx-plus"></i></a>
									<a href="portfolio-details.html" className="details-link" title="More Details"><i className="bx bx-link"></i></a>
								</div>
							</div>

						</div>

					</div>
				</section>

				{/* Testimonials */}
				<section id="testimonials">
					<div className="container">
						<div className="section-header">
							<h2>Testimonials</h2>
							<p>Sed tamen tempor magna labore dolore dolor sint tempor duis magna elit veniam aliqua esse amet veniam enim export quid quid veniam aliqua eram noster malis nulla duis fugiat culpa esse aute nulla ipsum velit export irure minim illum fore</p>
						</div>
						<div className="owl-carousel testimonials-carousel">

							<div className="testimonial-item">
								<p>
									<img src="assets/img/quote-sign-left.png" className="quote-sign-left" alt="" />
									Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
									<img src="assets/img/quote-sign-right.png" className="quote-sign-right" alt="" />
								</p>
								<img src="assets/img/testimonial-1.jpg" className="testimonial-img" alt="" />
								<h3>Saul Goodman</h3>
								<h4>Ceo &amp; Founder</h4>
							</div>

							<div className="testimonial-item">
								<p>
									<img src="assets/img/quote-sign-left.png" className="quote-sign-left" alt="" />
									Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
									<img src="assets/img/quote-sign-right.png" className="quote-sign-right" alt="" />
								</p>
								<img src="assets/img/testimonial-2.jpg" className="testimonial-img" alt="" />
								<h3>Sara Wilsson</h3>
								<h4>Designer</h4>
							</div>

							<div className="testimonial-item">
								<p>
									<img src="assets/img/quote-sign-left.png" className="quote-sign-left" alt="" />
									Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
									<img src="assets/img/quote-sign-right.png" className="quote-sign-right" alt="" />
								</p>
								<img src="assets/img/testimonial-3.jpg" className="testimonial-img" alt="" />
								<h3>Jena Karlis</h3>
								<h4>Store Owner</h4>
							</div>

							<div className="testimonial-item">
								<p>
									<img src="assets/img/quote-sign-left.png" className="quote-sign-left" alt="" />
									Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
									<img src="assets/img/quote-sign-right.png" className="quote-sign-right" alt="" />
								</p>
								<img src="assets/img/testimonial-4.jpg" className="testimonial-img" alt="" />
								<h3>Matt Brandon</h3>
								<h4>Freelancer</h4>
							</div>

							<div className="testimonial-item">
								<p>
									<img src="assets/img/quote-sign-left.png" className="quote-sign-left" alt="" />
									Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
									<img src="assets/img/quote-sign-right.png" className="quote-sign-right" alt="" />
								</p>
								<img src="assets/img/testimonial-5.jpg" className="testimonial-img" alt="" />
								<h3>John Larson</h3>
								<h4>Entrepreneur</h4>
							</div>

						</div>

					</div>
				</section>

				{/* Call */}
				<section id="call-to-action" className="wow fadeInUp">
					<div className="container">
						<div className="row">
							<div className="col-lg-9 text-center text-lg-left">
								<h3 className="cta-title">Call To Action</h3>
								<p className="cta-text"> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							</div>
							<div className="col-lg-3 cta-btn-container text-center">
								<a className="cta-btn align-middle" href="#">Call To Action</a>
							</div>
						</div>

					</div>
				</section>

				{/* Team */}
				<section id="team" className="wow fadeInUp">
					<div className="container">
						<div className="section-header">
							<h2>Our Team</h2>
						</div>
						<div className="row">
							<div className="col-lg-3 col-md-6">
								<div className="member">
									<div className="pic"><img src="assets/img/team-1.jpg" alt="" /></div>
									<div className="details">
										<h4>Walter White</h4>
										<span>Chief Executive Officer</span>
										<div className="social">
											<a href=""><i className="fa fa-twitter"></i></a>
											<a href=""><i className="fa fa-facebook"></i></a>
											<a href=""><i className="fa fa-google-plus"></i></a>
											<a href=""><i className="fa fa-linkedin"></i></a>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-3 col-md-6">
								<div className="member">
									<div className="pic"><img src="assets/img/team-2.jpg" alt="" /></div>
									<div className="details">
										<h4>Sarah Jhinson</h4>
										<span>Product Manager</span>
										<div className="social">
											<a href=""><i className="fa fa-twitter"></i></a>
											<a href=""><i className="fa fa-facebook"></i></a>
											<a href=""><i className="fa fa-google-plus"></i></a>
											<a href=""><i className="fa fa-linkedin"></i></a>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-3 col-md-6">
								<div className="member">
									<div className="pic"><img src="assets/img/team-3.jpg" alt="" /></div>
									<div className="details">
										<h4>William Anderson</h4>
										<span>CTO</span>
										<div className="social">
											<a href=""><i className="fa fa-twitter"></i></a>
											<a href=""><i className="fa fa-facebook"></i></a>
											<a href=""><i className="fa fa-google-plus"></i></a>
											<a href=""><i className="fa fa-linkedin"></i></a>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-3 col-md-6">
								<div className="member">
									<div className="pic"><img src="assets/img/team-4.jpg" alt="" /></div>
									<div className="details">
										<h4>Amanda Jepson</h4>
										<span>Accountant</span>
										<div className="social">
											<a href=""><i className="fa fa-twitter"></i></a>
											<a href=""><i className="fa fa-facebook"></i></a>
											<a href=""><i className="fa fa-google-plus"></i></a>
											<a href=""><i className="fa fa-linkedin"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</section>

				{/* Contact */}
				<section id="contact" className="wow fadeInUp">
					<div className="container">
						<div className="section-header">
							<h2>Contact Us</h2>
							<p>Sed tamen tempor magna labore dolore dolor sint tempor duis magna elit veniam aliqua esse amet veniam enim export quid quid veniam aliqua eram noster malis nulla duis fugiat culpa esse aute nulla ipsum velit export irure minim illum fore</p>
						</div>

						<div className="row contact-info">

							<div className="col-md-4">
								<div className="contact-address">
									<i className="ion-ios-location-outline"></i>
									<h3>Address</h3>
									<address>A108 Adam Street, NY 535022, USA</address>
								</div>
							</div>

							<div className="col-md-4">
								<div className="contact-phone">
									<i className="ion-ios-telephone-outline"></i>
									<h3>Phone Number</h3>
									<p><a href="tel:+155895548855">+1 5589 55488 55</a></p>
								</div>
							</div>

							<div className="col-md-4">
								<div className="contact-email">
									<i className="ion-ios-email-outline"></i>
									<h3>Email</h3>
									<p><a href="mailto:info@example.com">info@example.com</a></p>
								</div>
							</div>

						</div>
					</div>

					<div className="container mb-4">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.037823161156!2d106.66347851480108!3d10.808415092299862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292343e23a07%3A0x527b04ca479c846d!2zMiDEkOG7kW5nIMSQYSwgUGjGsOG7nW5nIDIsIFTDom4gQsOsbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1sen!2s!4v1636883434239!5m2!1sen!2s" width="100%" height="380" frameBorder={0} style={{ border: 0 }} allowFullScreen></iframe>
					</div>

					<div className="container">
						<div className="form">
							<form action="forms/contact.php" method="post" role="form" className="php-email-form">
								<div className="form-row">
									<div className="form-group col-md-6">
										<input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
										<div className="validate"></div>
									</div>
									<div className="form-group col-md-6">
										<input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
										<div className="validate"></div>
									</div>
								</div>
								<div className="form-group">
									<input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
									<div className="validate"></div>
								</div>
								<div className="form-group">
									<textarea className="form-control" name="message" rows={5} data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
									<div className="validate"></div>
								</div>

								<div className="mb-3">
									<div className="loading">Loading</div>
									<div className="error-message"></div>
									<div className="sent-message">Your message has been sent. Thank you!</div>
								</div>

								<div className="text-center"><button type="submit">Send Message</button></div>
							</form>
						</div>

					</div>
				</section>
			</main>
		</>
	);
};

export default HomePage;