import ProfileSVG from "../svg/profile";
import TroubleshootSVG from "../svg/troubleshoot";
import LearningSVG from "../svg/learning";
import PurchaseSVG from "../svg/purchase";
import MobileSVG from "../svg/mobile";
import TrustSVG from "../svg/trust";
import StartSVG from "../svg/start";
import InstructorSVG from "../svg/instructor";
import PromotionSVG from "../svg/promotion";
import ManageSVG from "../svg/manage";
import BuildSVG from "../svg/build";

const faqSubscriber = [
    "Refund Status: Common Questions",
    "Payment Method on J2C",
    "Lifetime Access",
    "How to Find Your Missing Course",
    "How to Download Certificate of Completion on Browser",
    "How to Refund a Course",
    "Downloading Course Resources",
    "Learning With J2C: Frequently Asked Questions",
    "Troubleshooting Payment Failures",
];

const faqInstructor = [
    "J2C Course Quality Checklist",
    "How to Become a Premium Instructor",
    "Promote Your Course With Coupons and Referral Link",
    "Instructor Revenue Share",
    "Instructor Promotional Agreements and J2C Deals",
    "Be an Instructor:Frequently Asked Questions",
];

const subscriberTopic = [
    {
        heading: "Getting started",
        content: "Learn how J2C works and how to start learning.",
        SVGcomponent: StartSVG,
    },
    {
        heading: "Account/Profile",
        content: "Manage Your account settings.",
        SVGcomponent: ProfileSVG,
    },
    {
        heading: "Troubleshooting",
        content: "Experiencing a technical issue? check here.",
        SVGcomponent: TroubleshootSVG,
    },
    {
        heading: "Learning Experience",
        content: "Learn about purchasing course, how to send gifts, and refunds.",
        SVGcomponent: LearningSVG,
    },
    {
        heading: "Purchase/Refunds",
        content: "Learn how J2C works and how to start learning.",
        SVGcomponent: PurchaseSVG,
    },
    {
        heading: "Mobile",
        content: "On the go? Learn about our mobile app.",
        SVGcomponent: MobileSVG,
    },
    {
        heading: "Trust & Safety",
        content: "Trust & Safety information and reporting.",
        SVGcomponent: TrustSVG,
    },
];

const instructorTopic = [
    {
        heading: "Instructor Payments",
        content: "Understand the revenue share and how to receive payments.",
        SVGcomponent: InstructorSVG,
    },
    {
        heading: "Selling & Promotion",
        content: "Learn about the announcement and promotional tools.",
        SVGcomponent: PromotionSVG,
    },
    {
        heading: "Course Building",
        content: "Build your course curriculum and landing page.",
        SVGcomponent: BuildSVG,
    },
    {
        heading: "Course Management",
        content: "Maintain your course and engage with students.",
        SVGcomponent: ManageSVG,
    },
    {
        heading: "Trust & Safety",
        content: "Policy and copyright questions and guidance.",
        SVGcomponent: TrustSVG,
    },
];

export default {
    faqSubscriber,
    faqInstructor,
    subscriberTopic,
    instructorTopic,
};