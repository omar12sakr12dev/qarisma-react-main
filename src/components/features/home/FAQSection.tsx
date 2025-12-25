import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "How would you rate your experience with us?",
            answer: "We strive to provide the best experience for our users. Your feedback helps us improve continuously."
        },
        {
            question: "What positives caught your attention in Al Karizma newspaper?",
            answer: "Our diverse content, professional journalism, and user-friendly interface are among the highlights."
        },
        {
            question: "What negatives bothered you in the online newspaper?",
            answer: "We're always working to address any issues. Please share your concerns through our contact form."
        },
        {
            question: "What things do you think need to change?",
            answer: "We value your suggestions and continuously work on improving our services based on user feedback."
        },
        {
            question: "What would you like to see on Al Karizma newspaper's website?",
            answer: "We're planning new features and content. Stay tuned for exciting updates!"
        }
    ];

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-light-rose">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-bold text-primary text-center mb-16">
                    Frequently Asked Questions
                </h2>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white/80 rounded-2xl shadow-md overflow-hidden"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/90 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <h3 className="text-lg md:text-xl font-bold text-foreground pr-4">
                                    {faq.question}
                                </h3>
                                <FaChevronDown
                                    className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <div
                                className={`accordion-content px-6 ${openIndex === index ? 'open' : ''}`}
                            >
                                <p className="text-foreground/80 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
