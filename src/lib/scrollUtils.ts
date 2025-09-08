export const handleScrollWithOffset = (
  e: React.MouseEvent<HTMLAnchorElement>, // Tipe untuk event klik pada elemen <a>
  targetId: string // Tipe untuk ID target (string)
) => {
  e.preventDefault(); // Mencegah perilaku default anchor

  // Bersihkan karakter '/' dan '#' di awal targetId
  const cleanTargetId = targetId.replace(/^\/?#/, '');
  const target = document.getElementById(cleanTargetId);

  if (target) {
    const navbarHeight = 80; // Tinggi navbar tetap
    const offsetPosition =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    // Gunakan requestAnimationFrame untuk scrolling yang lebih mulus
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth', // Scroll halus
      });
    });
  } else {
    console.error(`Section with ID "${cleanTargetId}" not found.`);
  }
};