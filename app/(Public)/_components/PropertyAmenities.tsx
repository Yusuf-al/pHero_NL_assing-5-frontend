export default function PropertyAmenities() {
    const amenities = [
        "WiFi",
        "Parking",
        "Swimming Pool",
        "Air Conditioning",
        "Security",
        "Gym",
    ];

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">
                Amenities
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {amenities.map((item) => (
                    <div key={item}>{item}</div>
                ))}
            </div>
        </section>
    );
}