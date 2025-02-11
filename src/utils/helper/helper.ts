const statuses = ['Delivered', 'Processing', 'Cancelled'];

export const randomStatus = () => {
    // Generate a random index between 0 and 2
    const randomIndex = Math.floor(Math.random() * 3);
    return statuses[randomIndex];

}

