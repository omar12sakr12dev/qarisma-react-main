import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

const CTABanner = () => {
    return (
        <section className="py-12 px-4">
            <div className="container mx-auto">
                <div className="bg-secondary rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <h3 className="text-2xl md:text-3xl font-outfit font-bold text-primary-foreground">
                        Stay informed, learn more & contact us
                    </h3>
                    <Link to="/contact">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 py-6 text-xl font-medium whitespace-nowrap">
                            Contact Us
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTABanner;
