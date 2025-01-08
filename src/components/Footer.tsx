const Footer: React.FC = () => {
  const today: Date = new Date();
  return (
    <footer className="w-full bg-[#66d8f5] p-4 flex justify-center items-center">
      <p>Copyright &copy; {today.getFullYear()} </p>
    </footer>
  );
};

export default Footer;
