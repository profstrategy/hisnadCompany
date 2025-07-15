import AboutHisnad from "../_components/about-page/about-hisnad";
import TeamPage from "../_components/about-page/team-page";
import Testimonial from "../_components/about-page/testimonial";

export default function AboutPublicPage() {
    console.log({ AboutHisnad, Testimonial, TeamPage });

    return (
        <div>
            <AboutHisnad />
            <Testimonial />
            <TeamPage />
        </div>
    );
}
