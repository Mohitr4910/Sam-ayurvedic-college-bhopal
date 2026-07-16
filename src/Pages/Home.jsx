import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./Home.css";
import crcl from "../assets/banner_img_bg.png";
import doctor from "../assets/hero-image.png";

import hero1 from "../assets/1681282034phpqmnCNq-scaled-e1741112523268.jpeg";
import hero2 from "../assets/Slider2.webp";
import hero3 from "../assets/Slider3.webp";
import hero4 from "../assets/Slider4.jpg";
import hero5 from "../assets/Slider5.webp";

import AnimatedContent from "../Components/AnimatedContent";


import img1 from "../assets/1606296487php6rXilZ-480x340.png";
import img2 from "../assets/dreamstimelarge_36568518_1024x1024_e2658407-0ee5-4ed0-909c-1e268d77e5db_719x480-480x340.jpg";
import img3 from "../assets/Foundaton-in-Ayurveda-480x340.jpg";
import img4 from "../assets/Screenshot-2024-06-25-123226-480x340.jpg";
import img5 from "../assets/WhatsApp-Image-2025-09-16-at-11.16.33_317191f4-480x340.jpg";
import img6 from "../assets/WhatsApp-Image-2025-09-16-at-11.17.15_4c36d38e-480x340.jpg";
import img7 from "../assets/WhatsApp-Image-2026-01-24-at-12.54.58-2.jpeg";


import gallaryimg1 from "../assets/Culture-Events-6-768x512.jpg";
import gallaryimg2 from "../assets/Events-And-Workshops-1-768x512.jpg";
import gallaryimg3 from "../assets/Events-And-Workshops-2-768x512.jpg";
import gallaryimg4 from "../assets/Events-And-Workshops-3-768x512.jpg";
import gallaryimg5 from "../assets/Events-And-Workshops-4-768x512.jpg";
import gallaryimg6 from "../assets/Events-And-Workshops-5-768x512.jpg";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


import doctorImg from "../assets/bg.jpg";

const departments = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7
];

const gallaryImages = [
  gallaryimg1,
  gallaryimg2,
  gallaryimg3,
  gallaryimg4,
  gallaryimg5,
  gallaryimg6,

];



import leader1 from "../assets/Leadership_chairman-300x300.jpg";
import leader3 from "../assets/Leadership_director.jpg";
import leader2 from "../assets/Leadership_executive_director.jpg";
import leader4 from "../assets/photo-Dr.A.K-Singh.jpeg.jpg";

const leaders = [
  {
    image: leader1,
    name: "Dr. Harpreet Singh Saluja",
    designation: "Hon'ble Chairman",
    organization: "SAM Group of Institutions",
     description:
      "We all have creative genius inside us. I don't think anybody will have a doubt in it. Our inherent genius is like the holy water flowing through sacred river Ganga. I am Proud to say that 'SAM' team has not only lived up to the spirit of the word TEAM but also added new dimension to it year after year.",
  },
  {
    image: leader2,
    name: "Ms. Preeti Saluja",
    designation: "Executive Director",
    organization: "SAM Group of Institutions",
    description:"The Institute works on the vision to become one of the leading center of teaching, research and extensions in the field of Management and Engineering through total commitment towards quality education training. Learning gives creativity, Creativity leads to thinking provides knowledge makes you GREAT",
  },
  {
    image: leader3,
    name: "Mr. Aviraj Chawla",
    designation: "Group Director",
    organization: "SAM Group of Institutions",
    description:"The Institute works on the vision to become one of the leading center of teaching, research and extensions in the field of Management and Engineering through total commitment towards quality education training. Learning gives creativity, Creativity leads to thinking provides knowledge makes you GREAT",
  },
  {
    image: leader4,
    name: "Dr. A.K. Singh",
    designation: "Principal",
    organization: "Sardar Ajit Singh Smriti Ayurvedic Mahavidyalaya",
  },
];

function Home() {
  return (
    <>

      <section className="hero-slider">
        <div className="slides">
          <img src={hero1} alt="Hero 1" />
          <img src={hero2} alt="Hero 2" />
          <img src={hero3} alt="Hero 3" />
          <img className="hero5" src={hero4} alt="Hero 4" />
          <img src={hero5} alt="Hero 5" />
        </div>
      </section>

      <section class="school-banner">
        <div class="school-banner-content">
          <h2>SCHOOL OF AYURVEDA SCIENCE</h2>
          <p>Recognized by Department of Ayush (A/F) &amp; NCISM New Delhi (A/F)</p>
        </div>
      </section>



      <section className="hero-section">
        <div className="hero-container">

          {/* Left Side */}
          <div className="hero-left">
<AnimatedContent direction="horizontal" reverse distance={200} duration={2} ease="power4.out">

            <span className="hero-tag">
              Welcome to SAM School of Ayurveda Science
            </span>

            <h1>
              Empowering Future
              Ayurvedic Doctors
            </h1>

            <p>
              SAM School of Ayurveda Science, a prestigious addition to SAM Global University, is dedicated to advancing the field of Ayurvedic medicine through its Bachelor of Ayurvedic Medicine and Surgery (BAMS) program. Established in 2019 under the Shri Guru Hargobind Society, SAM Global University is recognized as the leading private university in Bhopal, Madhya Pradesh.With a legacy spanning six decades, SGU has consistently set benchmarks in education and remains committed to excellence. The university’s recognition under the Madhya Pradesh Niji Vishwavidhyalaya (Sthapana Avam Sanchalan) Adhiniyam 2007 and by the UGC underscores its dedication to maintaining high standards.The SAM School of Ayurveda Science continues this tradition by offering comprehensive training in Ayurveda, preparing students to become proficient practitioners and contributors to the field.
            </p>

            <Link to="/admission" className="hero-btn">
              Apply for Admission
            </Link>

              </AnimatedContent>
          </div>

          {/* Right Side */}
          <div className="hero-right">
            <div className="hero-big-circle">
              <div className="hero-circle">
                <img src={crcl} alt="Ayurveda Background" />
              </div>

              <img
                src={doctor}
                alt="SAM Ayurveda"
                className="hero-img"
              />
            </div>
          </div>

        </div>
      </section>


      <section class="vmg-section">
<AnimatedContent direction="vertical"  distance={200} duration={2} ease="power4.out">
    <div class="vmg-container">
         

        <div class="vmg-card">
            <h3>Vision</h3>
            <p>
                To be recognized around the globe as an essence of true Ayurveda
                upholding the authentic principles in order to propagate health &
                well-being worldwide.
            </p>
        </div>

        <div class="vmg-card">
   
            <h3>Mission</h3>
            <p>
                To play the pivotal role in delivering quality health care to the
                society, especially in rural & remote areas through authentic
                Ayurveda.
            </p>
        </div>

        <div class="vmg-card">
            <h3>Goal</h3>
            <p>
                To be the best among equals in promotion & propagation of
                education and practice of Ayurveda in the community over the next
                five years.
            </p>
        </div>

    </div>
</AnimatedContent>
</section>


  <section className="department-section">

      <div className="section-title">
        <h2>DEPARTMENTS</h2>
        <span></span>
        <p>A thriving community of creativity and innovation</p>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        spaceBetween={25}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
        className="departmentSwiper"
      >
        {departments.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="department-card">
              <img src={image} alt={`Department ${index + 1}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>




    </section>

    <div className="section-divider"></div>

        <section className="leadership-section">
      <div className="leadership-heading">
        <span>OUR LEADERSHIP</span>
      </div>



      <div className="leadership-container">

        {leaders.map((leader, index) => (

<AnimatedContent direction="vertical"  distance={300} duration={index+1} ease="power4.out">
          <div className="leader-card" key={index}>

          
            <div className="leader-image">
              <img src={leader.image} alt={leader.name} />
            </div>

            <div className="leader-info">
              <h3>{leader.name}</h3>
              <h4>{leader.designation}</h4>
              <p>{leader.organization}</p>
            </div>

          </div>
        </AnimatedContent>
        ))}

      </div>

    </section>

     <section className="why-section">
      <div className="why-container">
<AnimatedContent direction="horizontal" reverse distance={400} duration={3} ease="power4.out">

        <div className="why-image">
          <img src={doctorImg} alt="Why Choose Ayurveda" />
        </div>
</AnimatedContent>

        <div className="why-content">

          <h2>Why Choose Ayurved?</h2>

          <span className="title-line"></span>

<AnimatedContent direction="horizontal"  distance={400} duration={3} ease="power4.out">

          <p>
            This is a centuries-old healthcare approach that continues to
            evolve, giving hopefuls the chance to learn more about the
            intricacies of the field and provide greater space for expansion.
          </p>

          <p>
            Because the field of study is focused on teaching a particular
            practical skill that can be learned and improved, students who
            possess this expertise will have ample opportunity to advance in a
            variety of career-related areas.
          </p>

          <p>
            Since Ayurveda uses natural components to obtain the best possible
            medical care, many patients find it more acceptable and relatable.
          </p>

          <p>
            Since the core of this research is the depth of patient health
            beliefs and values, Ayurvedic practice is linked to the highest
            level of wellness.
          </p>
</AnimatedContent>

        </div>

      </div>
    </section>



<section className="gallery-section">

  <div className="gallery-title">
    <h2>Gallery</h2>
    <span></span>
  </div>

  <Swiper
  modules={[Navigation, Autoplay]}
  navigation
  loop={true}
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
  }}
  spaceBetween={25}
  slidesPerView={3}
  breakpoints={{
    0: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
  }}
  className="gallerySwiper"
>
  {gallaryImages.map((img, index) => (
    <SwiperSlide key={index}>
      <div className="gallery-card">
        <img src={img} alt={`Gallery ${index + 1}`} />
      </div>
    </SwiperSlide>
  ))}
</Swiper>

</section>


<section className="video-section">
  <div className="video-title">
    <h2>Our Videos</h2>
    <span></span>
    <p>Watch our latest videos and campus highlights</p>
  </div>

  <div className="video-container">

    <div className="video-card">
      <iframe
        src="https://www.youtube.com/embed/NX-VW1-tOlk"
        title="Video 1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>

    <div className="video-card">
      <iframe
        src="https://www.youtube.com/embed/7pLXYMF5ZaM"
        title="Video 2"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>

    <div className="video-card">
      <iframe
        src="https://www.youtube.com/embed/OyAz2E08Nyo"
        title="Video 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>

  </div>
</section>

    </>
  );
}

export default Home;