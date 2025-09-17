export function optimizeCloudinaryImage(url) {
    if (!url || !url.includes('/upload/')) {
        return url;
    }
    const parts = url.split('/upload/');
    return `${parts[0]}/upload/f_auto,q_auto/${parts[1]}`;
}