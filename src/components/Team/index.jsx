import React, { useRef } from "react";
import "./Team.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import team1 from '../../assets/team1.jpg';
import team2 from '../../assets/team2.jpeg';



gsap.registerPlugin(ScrollTrigger);

const Teams = () => {
  const container = useRef(null);

  // Teams data defined within this file
  const teams = [
    {
      name: "Lingaiah",
      title: "Founder",
      profile: team1,
      social: [
        { name: "Facebook", icon: <CiFacebook />, url: "http://facebook.com" },
        { name: "LinkedIn", icon: <CiLinkedin />, url: "http://linkedin.com" },
        { name: "Youtube", icon: <FaYoutube />, url: "http://youtube.com" },
        { name: "Instagram", icon: <FaInstagram />, url: "http://instagram.com" },
      ],
    },
    
    
  ];

  // GSAP Animations
  useGSAP(() => {
    const timeline = gsap.timeline();

  
  }, { scope: container });

  return (  
    <section id="team" ref={container}>
      <div className="container">
        <h1 className="title">
          Our <span className="g-text">Board Members</span>
        </h1>
        <h3 className="sub__title">
          Meet our diverse team of creative minds, developers, and strategists
          — the driving force behind every project's success.
        </h3>
        <div className="teams__container">
          {teams.map((team, index) => (
            <div className="team__card" key={index}>
              <div className="profile__container">
                <img src={team.profile} alt={team.name} />
              </div>
              <div className="details">
                <h3 className="name">{team.name}</h3>
                <p className="text__muted">{team.title}</p>
                <div className="social__container">
                  {team.social.map((item, i) => (
                    <a
                      href={item.url || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="icon__container"
                      key={i}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
