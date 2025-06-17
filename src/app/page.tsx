"use client";

// The exported code uses styled-components instead of Tailwind CSS
import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Typography, Button, Divider, Tag, Tooltip, Image, Modal } from "antd";
import {
  MailOutlined,
  GithubOutlined,
  LinkedinOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import * as echarts from "echarts";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const { Text } = Typography;

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const sections = ["home", "about", "skills", "projects", "tech", "contact"];
  // Typewriter effect for hero section
  const [displayText, setDisplayText] = useState("");
  const fullText = "Building innovative solutions with modern technologies";
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);
  // Scroll to top button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize chart
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        animation: false,
        radar: {
          indicator: [
            { name: "Frontend", max: 100 },
            { name: "Backend", max: 100 },
            { name: "DevOps", max: 100 },
            { name: "Cloud", max: 100 },
            { name: "Architecture", max: 100 },
            { name: "AI/ML", max: 100 },
          ],
          radius: 130,
          splitNumber: 4,
          axisName: {
            color: "#64FFDA",
            fontSize: 14,
          },
          splitLine: {
            lineStyle: {
              color: "rgba(100, 255, 218, 0.2)",
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(100, 255, 218, 0.3)",
            },
          },
        },
        series: [
          {
            name: "Skills",
            type: "radar",
            data: [
              {
                value: [90, 95, 85, 92, 88, 80],
                name: "Skill Level",
                areaStyle: {
                  color: "rgba(100, 255, 218, 0.2)",
                },
                lineStyle: {
                  color: "#64FFDA",
                  width: 2,
                },
                itemStyle: {
                  color: "#64FFDA",
                },
              },
            ],
          },
        ],
      };
      chart.setOption(option);
      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        chart.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const openCarousel = (project: any, imageIndex: number = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(imageIndex);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const projects = [
    {
      title: "AI-powered OCR Image Extraction System",
      description: "A high-efficiency OCR platform that uses OpenAI GPT-4o Vision to extract structured data and raw text from images. Supports cost estimation, JSON output, and token-level analytics.",
      tags: ["OCR", "Image to Text", "GPT-4o Vision", "JSON Extraction", "Token Usage", "Next.js"],
      image:
        "/image/ocr/Screenshot 2568-06-17 at 15.55.27.png",
      images: [
        "/image/ocr/Screenshot 2568-06-17 at 15.55.27.png",
        "/image/ocr/Screenshot 2568-06-17 at 15.51.33.png",
        "/image/ocr/Screenshot 2568-06-17 at 15.55.58.png",
        "/image/ocr/Screenshot 2568-06-17 at 15.56.15.png",
        "/image/ocr/Screenshot 2568-06-17 at 15.56.32.png",
        "/image/ocr/Screenshot 2568-06-17 at 15.51.22.png",
      ],
    },
    {
      title: "Chootday - Online Dress Rental Platform",
      description:
        "A modern e-commerce platform for dress rentals featuring inventory management, booking system, and secure payment processing.",
      tags: ["E-commerce", "Next.js", "PostgreSQL", "AWS", "Hasura"],
      image:
        "/image/chootday/Screenshot 2568-06-16 at 10.44.54.png",
      images: [
        "/image/chootday/Screenshot 2568-06-16 at 10.44.54.png",
        "/image/chootday/Screenshot 2568-06-16 at 10.45.04.png",
        "/image/chootday/Screenshot 2568-06-16 at 10.45.21.png",
        "/image/chootday/Screenshot 2568-06-16 at 10.46.05.png",
        "/image/chootday/Screenshot 2568-06-16 at 10.46.15.png",
        "/image/chootday/Screenshot 2568-06-16 at 10.46.22.png",
      ],
    },
  ];
  const techStack = [
    {
      category: "Frontend",
      items: ["Next.js", "React", "TailwindCSS", "TypeScript", "GraphQL"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "PostgreSQL", "Hasura", "MongoDB"],
    },
    {
      category: "DevOps",
      items: ["Docker", "Jenkins", "Kubernetes", "CI/CD", "Playwright"],
    },
    {
      category: "Cloud",
      items: ["AWS EKS", "AWS Cognito", "DynamoDB", "S3", "Lambda"],
    },
  ];
  return (
    <>
      <GlobalStyle />
      <Container>
        {/* Navigation */}
        <Header>
          <HeaderContainer>
            <Logo>
              P<span>.</span>
            </Logo>
            {/* Desktop Navigation */}
            <Nav>
              {sections.map((section, index) => (
                <NavButton
                  key={section}
                  onClick={() => scrollToSection(section)}
                  $isActive={activeSection === section}
                >
                  <span>0{index + 1}.</span>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </NavButton>
              ))}
            </Nav>
            {/* Mobile Navigation Toggle */}
            <MobileMenuButton
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i
                className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
              ></i>
            </MobileMenuButton>
          </HeaderContainer>
          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <MobileMenu>
              <MobileMenuContainer>
                {sections.map((section, index) => (
                  <NavButton
                    key={section}
                    onClick={() => scrollToSection(section)}
                    $isActive={activeSection === section}
                  >
                    <span>0{index + 1}.</span>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </NavButton>
                ))}
              </MobileMenuContainer>
            </MobileMenu>
          )}
        </Header>
        {/* Hero Section */}
        <HeroSection>
          <HeroBackground>
            <img
              src="https://readdy.ai/api/search-image?query=Abstract%20digital%20technology%20background%20with%20subtle%20blue%20and%20purple%20gradient%2C%20minimalist%20geometric%20patterns%20and%20soft%20glowing%20particles%2C%20perfect%20for%20a%20tech%20professional%20portfolio%20hero%20section%20with%20space%20for%20text%20on%20the%20left%20side%2C%20modern%20and%20sophisticated&width=1440&height=800&seq=6&orientation=landscape"
              alt="Background"
            />
          </HeroBackground>
          <HeroContent>
            <div>
              <HeroIntro>Hi, my name is</HeroIntro>
              <HeroTitle>Karun Kalantabutra</HeroTitle>
              <HeroSubtitle>Solutions Architect & Developer</HeroSubtitle>
              <HeroDescription>
                <p>
                  {displayText}
                  <span className="animate-pulse">|</span>
                </p>
              </HeroDescription>
              <Button
                type="primary"
                size="large"
                className="bg-transparent border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 cursor-pointer whitespace-nowrap !rounded-button"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
            </div>
          </HeroContent>
        </HeroSection>
        {/* About Section */}
        <Section id="about">
          <SectionContainer>
            <SectionHeader>
              <h2>
                <span>01.</span>About Me
              </h2>
              <Divider style={{ flexGrow: 1, minWidth: "100px", backgroundColor: "gray" }} />
            </SectionHeader>
            <AboutContent>
              <AboutText>
                <p>
                  I&apos;m a passionate Solutions Architect and Developer with
                  extensive experience in building
                  <Text style={{ color: "#64FFDA" }}> Microservices</Text>,
                  <Text style={{ color: "#64FFDA" }}> KYC systems</Text>,
                  <Text style={{ color: "#64FFDA" }}>
                    {" "}
                    AI-integrated applications
                  </Text>
                  , and
                  <Text style={{ color: "#64FFDA" }}> automation tools</Text>. My
                  expertise spans across the full technology stack, allowing me to
                  design and implement comprehensive solutions that address
                  complex business challenges.
                </p>
                <p>
                  I specialize in web and mobile development using modern
                  technologies such as
                  <Text style={{ color: "#64FFDA" }}> Next.js</Text>,
                  <Text style={{ color: "#64FFDA" }}> Node.js</Text>,
                  <Text style={{ color: "#64FFDA" }}> GraphQL</Text>,
                  <Text style={{ color: "#64FFDA" }}> Hasura</Text>, and
                  <Text style={{ color: "#64FFDA" }}> PostgreSQL</Text>. My cloud
                  expertise centers around
                  <Text style={{ color: "#64FFDA" }}> AWS</Text> services including
                  EKS, Cognito, and DynamoDB.
                </p>
                <p>
                  I&apos;m also proficient in DevOps practices, utilizing tools like
                  <Text style={{ color: "#64FFDA" }}> Docker</Text>,
                  <Text style={{ color: "#64FFDA" }}> Jenkins</Text>, and
                  <Text style={{ color: "#64FFDA" }}> Playwright</Text>
                  to ensure efficient development workflows and reliable
                  deployments.
                </p>
              </AboutText>
              <AboutImage>
                <div>
                  <div className="absolute inset-0 border-2 border-[#64FFDA] rounded-md transform translate-x-5 translate-y-5"></div>
                  <Image
                    preview={false}
                    src="/Image/karun kalantabutra.jpg"
                    alt="Karun Kalantabutra"
                    className="w-full h-full object-cover object-top rounded-md z-10 relative"
                  />
                </div>
              </AboutImage>
            </AboutContent>
          </SectionContainer>
        </Section>
        {/* Skills Section */}
        <Section id="skills" $bg="#112240">
          <SectionContainer>
            <SectionHeader>
              <h2>
                <span>02.</span>Skills
              </h2>
              <Divider style={{ flexGrow: 1, minWidth: "100px", backgroundColor: "gray" }} />
            </SectionHeader>
            <SkillsGrid>
              <SkillCard>
                <h3>Frontend Development</h3>
                <SkillTags>
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "TailwindCSS",
                    "GraphQL",
                  ].map((skill) => (
                    <Tag
                      key={skill}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#112240",
                        color: "#64FFDA",
                        border: "1px solid #64FFDA",
                        borderRadius: "9999px",
                        fontSize: "0.875rem"
                      }}
                    >
                      {skill}
                    </Tag>
                  ))}
                </SkillTags>
              </SkillCard>

              <SkillCard>
                <h3>Backend Development</h3>
                <SkillTags>
                  {[
                    "Node.js",
                    "GraphQL",
                    "PostgreSQL",
                    "Hasura",
                    "Express",
                    "MongoDB",
                  ].map((skill) => (
                    <Tag
                      key={skill}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#112240",
                        color: "#64FFDA",
                        border: "1px solid #64FFDA",
                        borderRadius: "9999px",
                        fontSize: "0.875rem"
                      }}
                    >
                      {skill}
                    </Tag>
                  ))}
                </SkillTags>
              </SkillCard>

              <SkillCard>
                <h3>DevOps & Tools</h3>
                <SkillTags>
                  {[
                    "Docker",
                    "Jenkins",
                    "Kubernetes",
                    "CI/CD",
                    "Git",
                    "Playwright",
                  ].map((skill) => (
                    <Tag
                      key={skill}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#112240",
                        color: "#64FFDA",
                        border: "1px solid #64FFDA",
                        borderRadius: "9999px",
                        fontSize: "0.875rem"
                      }}
                    >
                      {skill}
                    </Tag>
                  ))}
                </SkillTags>
              </SkillCard>

              <SkillCard>
                <h3>Cloud & Infrastructure</h3>
                <SkillTags>
                  {[
                    "AWS EKS",
                    "AWS Cognito",
                    "DynamoDB",
                    "S3",
                    "Lambda",
                    "CloudFront",
                  ].map((skill) => (
                    <Tag
                      key={skill}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#112240",
                        color: "#64FFDA",
                        border: "1px solid #64FFDA",
                        borderRadius: "9999px",
                        fontSize: "0.875rem"
                      }}
                    >
                      {skill}
                    </Tag>
                  ))}
                </SkillTags>
              </SkillCard>
            </SkillsGrid>
          </SectionContainer>
        </Section>
        {/* Projects Section */}
        <Section id="projects">
          <SectionContainer>
            <SectionHeader>
              <h2>
                <span>03.</span>Projects
              </h2>
              <Divider style={{ flexGrow: 1, minWidth: "100px", backgroundColor: "gray" }} />
            </SectionHeader>
            <ProjectsGrid>
              {projects.map((project, index) => (
                <ProjectCard key={index}>
                  <ProjectImage onClick={() => openCarousel(project, 0)}>
                    <img
                      src={project.image}
                      alt={project.title}
                    />
                    <ProjectImageOverlay>
                      <i className="fas fa-search-plus"></i>
                    </ProjectImageOverlay>
                  </ProjectImage>
                  <ProjectContent>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ProjectTags>
                      {project.tags.map((tag) => (
                        <Tag
                          key={tag}
                          style={{
                            backgroundColor: "#0A192F",
                            color: "#64FFDA",
                            border: "none"
                          }}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </ProjectTags>
                    <ProjectButtons>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-external-link-alt"></i>
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fab fa-github"></i>
                          Code
                        </a>
                      )}
                    </ProjectButtons>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </SectionContainer>
        </Section>
        {/* Tech Stack Section */}
        <Section id="tech" $bg="#112240">
          <SectionContainer>
            <SectionHeader>
              <h2>
                <span>04.</span>Tech Stack
              </h2>
              <Divider style={{ flexGrow: 1, minWidth: "100px", backgroundColor: "gray" }} />
            </SectionHeader>
            <TechGrid>
              {techStack.map((category) => (
                <TechCategory key={category.category}>
                  <h3>{category.category}</h3>
                  <TechItems>
                    {category.items.map((item) => (
                      <TechItem key={item}>
                        <i className="fas fa-check"></i>
                        <span>{item}</span>
                      </TechItem>
                    ))}
                  </TechItems>
                </TechCategory>
              ))}
            </TechGrid>
            <TechLogos>
              {[
                "Next.js",
                "React",
                "Node.js",
                "TypeScript",
                "GraphQL",
                "PostgreSQL",
                "AWS",
                "Docker",
              ].map((tech) => (
                <TechLogo key={tech}>
                  <div>
                    <i
                      className={`fab fa-${tech.toLowerCase().replace(".js", "").replace("type", "")}`}
                    ></i>
                  </div>
                  <p>{tech}</p>
                </TechLogo>
              ))}
            </TechLogos>
          </SectionContainer>
        </Section>
        {/* Contact Section */}
        <Section id="contact">
          <SectionContainer>
            <SectionHeader>
              <h2>
                <span>05.</span>Get In Touch
              </h2>
            </SectionHeader>
            <ContactContent>
              <p>
                I&apos;m currently open to new opportunities and collaborations. Whether
                you have a question or just want to say hi, I&apos;ll do my best to get
                back to you!
              </p>
              <ContactEmail>
                <a href="mailto:pondkarun@gmail.com">
                  <MailOutlined /> pondkarun@gmail.com
                </a>
              </ContactEmail>
              <ContactSocials>
                <Tooltip title="GitHub">
                  <Button
                    type="text"
                    shape="circle"
                    size="large"
                    icon={<GithubOutlined />}
                    style={{
                      color: "#9ca3af",
                      fontSize: "1.5rem"
                    }}
                  />
                </Tooltip>
                <Tooltip title="LinkedIn">
                  <Button
                    type="text"
                    shape="circle"
                    size="large"
                    icon={<LinkedinOutlined />}
                    style={{
                      color: "#9ca3af",
                      fontSize: "1.5rem"
                    }}
                  />
                </Tooltip>
              </ContactSocials>
            </ContactContent>
          </SectionContainer>
        </Section>
        {/* Footer */}
        <Footer>
          <SectionContainer>
            <p>
              Designed & Built by Pondkarun © {new Date().getFullYear()}
            </p>
          </SectionContainer>
        </Footer>
        {/* Scroll to top button */}
        {isVisible && (
          <ScrollToTopButton onClick={scrollToTop}>
            <ArrowUpOutlined />
          </ScrollToTopButton>
        )}

        {/* Carousel Modal */}
        <CarouselModal
          title={selectedProject?.title}
          open={isCarouselOpen}
          onCancel={closeCarousel}
          footer={null}
          width="90%"
          style={{ maxWidth: '1200px' }}
          centered
        >
          {selectedProject && (
            <>
              <CarouselContainer>
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  initialSlide={currentImageIndex}
                  onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
                >
                  {selectedProject.images?.map((image: string, index: number) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`${selectedProject.title} - Screenshot ${index + 1}`}
                        loading="lazy"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </CarouselContainer>

              <ProjectInfo>
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                <ProjectTags>
                  {selectedProject.tags?.map((tag: string) => (
                    <Tag
                      key={tag}
                      style={{
                        backgroundColor: "#0A192F",
                        color: "#64FFDA",
                        border: "1px solid #64FFDA",
                        borderRadius: "4px"
                      }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </ProjectTags>
                <ProjectLinks>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      View Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i>
                      View Source Code
                    </a>
                  )}
                </ProjectLinks>
              </ProjectInfo>
            </>
          )}
        </CarouselModal>
      </Container>
    </>
  );
};

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    min-height: 1024px;
    background-color: #0A192F;
  }
  
  .custom-progress .ant-progress-bg {
    height: 8px !important;
    border-radius: 4px;
  }
  
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

// Animations
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #0A192F;
  color: #d1d5db;
  font-family: system-ui, -apple-system, sans-serif;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(10, 25, 47, 0.9);
  backdrop-filter: blur(4px);
  z-index: 50;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: #64FFDA;
  font-weight: bold;
  font-size: 1.5rem;
  
  span {
    color: #d1d5db;
  }
`;

const Nav = styled.nav`
  display: none;
  gap: 2rem;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavButton = styled.button<{ $isActive: boolean }>`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  background: none;
  color: ${props => props.$isActive ? '#64FFDA' : '#9ca3af'};
  transition: color 0.3s;
  
  &:hover {
    color: ${props => props.$isActive ? '#64FFDA' : '#e5e7eb'};
  }
  
  span {
    color: #64FFDA;
    margin-right: 0.25rem;
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  color: #64FFDA;
  cursor: pointer;
  white-space: nowrap;
  border: none;
  background: none;
  font-size: 1.25rem;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  background-color: #112240;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
  position: relative;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(10, 25, 47, 0.9);
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  
  > div {
    max-width: 48rem;
  }
`;

const HeroIntro = styled.div`
  color: #64FFDA;
  margin-bottom: 1rem;
  font-size: 1.125rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #f3f4f6;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #9ca3af;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroDescription = styled.div`
  height: 5rem;
  
  p {
    font-size: 1.25rem;
    color: #9ca3af;
    margin-bottom: 2rem;
    
    span {
      animation: ${pulse} 1s infinite;
    }
  }
`;

const Section = styled.section<{ $bg?: string }>`
  padding: 5rem 0;
  background-color: ${props => props.$bg || 'transparent'};
  position: relative;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  
  h2 {
    font-size: 1.875rem;
    font-weight: bold;
    color: #f3f4f6;
    
    span {
      color: #64FFDA;
      margin-right: 0.5rem;
    }
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    
    > div:first-child {
      width: 50%;
    }
    
    > div:last-child {
      width: 50%;
    }
  }
`;

const AboutText = styled.div`
  p {
    color: #9ca3af;
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }
`;

const AboutImage = styled.div`
  display: flex;
  justify-content: center;
  
  > div {
    position: relative;
    width: 20rem;
    height: 20rem;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border: 2px solid #64FFDA;
      border-radius: 0.375rem;
      transform: translate(1.25rem, 1.25rem);
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
      border-radius: 0.375rem;
      z-index: 10;
      position: relative;
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SkillCard = styled.div`
  background-color: #0A192F;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #64FFDA;
    margin-bottom: 1.5rem;
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: #112240;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-0.5rem);
  }
`;

const ProjectImage = styled.div`
  position: relative;
  height: 14rem;
  overflow: hidden;
  cursor: pointer;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.5s;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #112240, transparent);
    opacity: 0.7;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #f3f4f6;
    margin-bottom: 0.75rem;
  }
  
  p {
    color: #9ca3af;
    margin-bottom: 1rem;
  }
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ProjectButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const TechCategory = styled.div`
  background-color: #0A192F;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #64FFDA;
    margin-bottom: 1.5rem;
  }
`;

const TechItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const TechItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  i {
    color: #64FFDA;
    font-size: 0.875rem;
  }
  
  span {
    color: #d1d5db;
  }
`;

const TechLogos = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  opacity: 0.7;
`;

const TechLogo = styled.div`
  text-align: center;
  transition: all 0.3s;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  
  > div {
    width: 4rem;
    height: 4rem;
    margin: 0 auto 0.5rem auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: #9ca3af;
  }
  
  p {
    color: #9ca3af;
    font-size: 0.875rem;
  }
`;

const ContactContent = styled.div`
  text-align: center;
  max-width: 48rem;
  margin: 0 auto;
  
  p {
    color: #9ca3af;
    font-size: 1.125rem;
    margin-bottom: 2.5rem;
  }
`;

const ContactEmail = styled.div`
  margin-bottom: 3rem;
  
  a {
    font-size: 1.5rem;
    color: #64FFDA;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
    
    .anticon {
      margin-right: 0.5rem;
    }
  }
`;

const ContactSocials = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const Footer = styled.footer`
  padding: 1.5rem 0;
  background-color: #0A192F;
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  text-align: center;
  
  p {
    color: #6b7280;
    font-size: 0.875rem;
  }
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: rgba(100, 255, 218, 0.1);
  color: #64FFDA;
  padding: 0.75rem;
  border-radius: 50%;
  border: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(100, 255, 218, 0.2);
  }
`;

// Carousel Modal Styles
const CarouselModal = styled(Modal)`
  .ant-modal-content {
    background-color: #0A192F;
    border: 1px solid rgba(100, 255, 218, 0.2);
    border-radius: 12px;
    overflow: hidden;
  }
  
  .ant-modal-body {
    padding: 0;
  }
  
  .ant-modal-header {
    background-color: #112240;
    border-bottom: 1px solid rgba(100, 255, 218, 0.1);
    padding: 1rem 1.5rem;
  }
  
  .ant-modal-title {
    color: #64FFDA;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .ant-modal-close {
    color: #64FFDA;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  max-height: 70vh;
  
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 100%;
      height: auto;
      max-height: 60vh;
      object-fit: contain;
      border-radius: 8px;
    }
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #64FFDA !important;
    background-color: rgba(10, 25, 47, 0.8);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    
    &:after {
      font-size: 16px;
    }
    
    &:hover {
      background-color: rgba(100, 255, 218, 0.1);
    }
  }
  
  .swiper-pagination-bullet {
    background-color: rgba(100, 255, 218, 0.3);
    
    &.swiper-pagination-bullet-active {
      background-color: #64FFDA;
    }
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
  background-color: #112240;
  
  h3 {
    color: #f3f4f6;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  p {
    color: #9ca3af;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: transparent;
    border: 1px solid #64FFDA;
    color: #64FFDA;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.3s;
    
    &:hover {
      background-color: rgba(100, 255, 218, 0.1);
      color: #64FFDA;
    }
    
    i {
      font-size: 0.875rem;
    }
  }
`;

const ProjectImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
  }
  
  i {
    color: #64FFDA;
    font-size: 2rem;
  }
`;




export default App;
