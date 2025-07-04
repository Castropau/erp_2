// export default function LoadingLogin() {
//   return (
//     <div className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-white flex items-center justify-center">
//       <img
//         src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//         className="fade-image w-full h-full object-cover animate-fadeInOut"
//         alt="Loading..."
//       />
//     </div>
//   );
// }
import Image from "next/image";

export default function LoadingLogin() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      {/* <img
        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
        className="fade-image  object-contain animate-fadeInOut"
        alt="Loading..."
      /> */}
      <Image
        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
        alt="Loading..."
        width={400} // ✅ You must provide width & height when using external images
        height={300}
        className="fade-image object-contain animate-fadeInOut"
      />
    </div>
  );
}
