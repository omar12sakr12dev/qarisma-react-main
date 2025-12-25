import StatItem from './StatItem';

const StatsSection = () => {
    return (
        <section className="py-20 bg-light-rose/60">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
                    <span className="shimmer-text">Explore more about us!</span>
                </h2>

                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                    <StatItem targetNumber={50000} label="Users" size="small" variant="pink" />
                    <StatItem targetNumber={50000} label="Articles" size="large" variant="primary" />
                    <StatItem targetNumber={50000} label="News" size="small" variant="pink" />
                    <StatItem targetNumber={50000} label="Journalists" size="large" variant="primary" />
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
