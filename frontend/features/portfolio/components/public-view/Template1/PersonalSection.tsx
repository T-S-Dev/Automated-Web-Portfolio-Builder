import { Github, Linkedin, LucideIcon, Mail, MapPin, Phone } from "lucide-react";

import { Portfolio } from "@/types";

const PersonalSection = ({ personal }: { personal: Portfolio["personal"] }) => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <div className="from-accent-teal to-accent-green flex max-w-6xl flex-col items-center justify-center bg-gradient-to-br bg-clip-text text-center text-transparent">
        <p className="mb-4 text-sm font-medium tracking-wider">Hi, my name is</p>

        <h1 className="mb-4 text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="text-balance">{personal?.name}.</span>
        </h1>

        <h2 className="mb-8 text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="text-balance">{personal?.job_title}</span>
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {personal?.github && <SocialIcon href={personal.github} label="GitHub" Icon={Github} />}
        {personal?.linkedin && <SocialIcon href={personal.linkedin} label="LinkedIn" Icon={Linkedin} />}
        {personal?.email && <SocialIcon href={`mailto:${personal.email}`} label="Email" Icon={Mail} />}
        {personal?.phone && <SocialIcon href={`tel:${personal.phone}`} label="Phone" Icon={Phone} />}
        {personal?.location && (
          <div className="flex items-center gap-1">
            <MapPin size={20} aria-hidden="true" />
            <span className="text-sm">{personal.location}</span>
          </div>
        )}
      </div>
    </section>
  );
};

type SocialIconProps = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

const SocialIcon = ({ href, label, Icon }: SocialIconProps) => (
  <a
    href={href || "#"}
    target={href ? "_blank" : ""}
    rel="noopener noreferrer"
    className="hover:text-accent-teal flex items-center gap-2 transition duration-300"
    aria-label={label}
  >
    <Icon size={24} aria-hidden="true" />
  </a>
);

export default PersonalSection;
