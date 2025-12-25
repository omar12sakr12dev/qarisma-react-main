import { Button } from "../../ui/button";

const FieldsSection = () => {
    const fields = [
        { label: "🏠", variant: "pink" },
        { label: "Politics", variant: "primary" },
        { label: "Sports", variant: "primary" },
        { label: "Culture", variant: "primary" },
        { label: "Science", variant: "primary" },
        { label: "Health", variant: "primary" },
        { label: "Entertainment", variant: "primary" },
        { label: "Business", variant: "primary" },
    ];

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                    Explore Our Fields
                </h2>
                <p className="text-xl md:text-2xl text-foreground mb-12 max-w-3xl mx-auto">
                    Discover content across various categories and find what interests you the most.
                </p>

                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {fields.map((field, index) => (
                        <Button
                            key={index}
                            className={`rounded-2xl px-8 py-6 text-lg font-medium min-w-[120px] ${field.variant === "pink"
                                    ? "bg-pink hover:bg-pink/90"
                                    : "bg-primary hover:bg-primary/90"
                                } text-primary-foreground`}
                        >
                            {field.label}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FieldsSection;
