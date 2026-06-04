import type { StaticImageData } from "next/image";
import imgSlider01 from "@/assets/img/Slider-01.jpg";
import imgSlider02 from "@/assets/img/Slider-02.jpg";
import imgSlider03 from "@/assets/img/Slider-03.jpg";
import imgSlider04 from "@/assets/img/Slider-04.jpg";
import imgSlider05 from "@/assets/img/Slider-05.jpg";
import imgNewsTet from "@/assets/img/news-tet.jpg";
import imgNewsConDau2 from "@/assets/img/news-con-dau-2.png";

export interface NewsArticleData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string | StaticImageData;
  content: string;
  extraImages?: (string | StaticImageData)[];
}

export const newsArticles: NewsArticleData[] = [
  {
    id: 1,
    slug: "thong-bao-lich-nghi-gio-to-hung-vuong-va-le-30-4-1-5",
    title: "Thông báo lịch nghỉ Giỗ Tổ Hùng Vương và Lễ 30/4 - 1/5",
    excerpt:
      "ASN trân trọng thông báo lịch nghỉ Giỗ Tổ Hùng Vương và Lễ 30/4 - 1/5 năm 2026.",
    category: "Tin tổng hợp",
    date: "22/04/2026",
    image: imgSlider04,
    content: `ASN trân trọng thông báo lịch nghỉ Giỗ Tổ Hùng Vương và Lễ 30/4 - 1/5 năm 2026 như sau:

🔵 Giỗ Tổ Hùng Vương:
Nghỉ vào Ngày 27.04.2026
Hoạt động trở lại vào ngày 28.04 - 29.04.2026

🔵 Lễ 30/4 & 1/5:
Nghỉ vào Ngày Ngày 30.04 - 03.05.2026
Hoạt động trở lại vào ngày 04.05.2026

Kính chúc Quý Khách hàng, Quý Đối tác có kì nghỉ lễ ấm áp và hạnh phúc!`,
  },
  {
    id: 2,
    slug: "thong-bao-lich-nghi-tet-nguyen-dan",
    title: "Thông báo lịch nghỉ Tết Nguyên Đán",
    excerpt:
      "Văn phòng Công chứng Châu Á - ASN xin trân trọng thông báo lịch nghỉ Tết Nguyên Đán năm 2026.",
    category: "Tin tổng hợp",
    date: "10/02/2026",
    image: imgNewsTet,
    content: `Văn phòng Công chứng Châu Á - ASN xin trân trọng thông báo lịch nghỉ Tết Nguyên Đán năm 2026 như sau:

🔹 Thời gian nghỉ: Từ Thứ Bảy, ngày 14/02/2026 (27 Tháng Chạp) đến hết Chủ Nhật, ngày 22/02/2026 (Mùng 6 Tháng Giêng)

🔹 Thời gian làm việc lại: Thứ Hai, ngày 23/02/2026 (Mùng 7 Tháng Giêng)

Kính chúc Quý Khách hàng, Quý Đối tác có kì nghỉ Tết Nguyên Đán ấm áp và hạnh phúc!`,
  },
  {
    id: 3,
    slug: "asn-hoan-thanh-lop-boi-duong-nghiep-vu-cong-chung-chuyen-doi-so-2025",
    title:
      "ASN đã chính thức hoàn thành Lớp bồi dưỡng nghiệp vụ công chứng – Chuyên đề chuyển đổi số năm 2025",
    excerpt:
      "Các Công chứng viên và Thư ký Nghiệp vụ của ASN đã chính thức hoàn thành Lớp bồi dưỡng nghiệp vụ công chứng – Chuyên đề chuyển đổi số.",
    category: "Tin tổng hợp",
    date: "11/09/2025",
    image: imgSlider01,
    content: `Vào ngày 09/09/2025 mới đây, các Công chứng viên và Thư ký Nghiệp vụ của ASN đã chính thức hoàn thành Lớp bồi dưỡng nghiệp vụ công chứng – Chuyên đề chuyển đổi số (Đợt I năm 2025), với tổng cộng 4 buổi học do Hiệp hội công chứng viên Việt Nam tổ chức. Những kiến thức của lớp học đã mang lại những giá trị thiết thực trong bối cảnh chuyển đổi số đang diễn ra mạnh mẽ trong ngành công chứng.

Với sự tham gia nhiệt tình này cũng thể hiện cam kết mạnh mẽ của ASN với chiến lược chuyển đổi số — không chỉ để hiện đại hoá quy trình làm việc mà còn nhằm nâng cao chất lượng phục vụ khách hàng trong mọi hoạt động 💙`,
  },
  {
    id: 4,
    slug: "luat-cong-chung-2024-bo-cong-chung-ban-dich-thay-bang-chung-thuc-chu-ky-nguoi-dich",
    title:
      "Luật Công chứng 2024 bỏ nội dung công chứng bản dịch ra khỏi phạm vi công chứng, thay bằng chứng thực chữ ký người dịch",
    excerpt:
      "Sẽ không còn cần thực hiện công chứng bản dịch từ ngày 01/07/2025? Luật Công chứng 2024 đã bỏ nội dung công chứng bản dịch ra khỏi phạm vi công chứng.",
    category: "Tin pháp luật",
    date: "30/07/2025",
    image: imgSlider02,
    content: `Sẽ không còn cần thực hiện công chứng bản dịch từ ngày 01/07/2025? Đúng hay sai?

🔎 Cụ thể, theo điểm c khoản 1 Điều 18 Luật Công chứng 2024 về quyền và nghĩa vụ của công chứng viên, thì một trong những quyền được quy định đó là: Được công chứng giao dịch theo quy định của Luật này và quy định khác của pháp luật có liên quan; được chứng thực bản sao từ bản chính, chứng thực chữ ký trong giấy tờ, văn bản, chứng thực chữ ký người dịch theo quy định của pháp luật về chứng thực.

🔎 Bên cạnh đó, cũng theo khoản 11 Điều 76 Luật Công chứng 2024 quy định chuyển tiếp về hoạt động công chứng kể từ ngày Luật này có hiệu lực thi hành (01/07/2025) nêu rõ, đối với bản dịch đã được công chứng trước ngày Luật này có hiệu lực thi hành thì sẽ tiếp tục có giá trị sử dụng; trường hợp có nhu cầu sử dụng bản dịch thì thực hiện thủ tục chứng thực chữ ký người dịch theo quy định của Luật này và pháp luật về chứng thực.

📣📣📣 Như vậy, Luật Công chứng 2024 đã bỏ nội dung công chứng bản dịch ra khỏi phạm vi công chứng. Thay vào đó, công chứng viên sẽ thực hiện CHỨNG THỰC CHỮ KÝ NGƯỜI DỊCH.

Mọi thắc mắc, đừng ngần ngại liên hệ Văn phòng Công chứng Châu Á – ASN để được hỗ trợ nhanh chóng!`,
  },
  {
    id: 5,
    slug: "thong-bao-luu-tru-ho-so-dien-tu-co-chu-ky-so",
    title: "Thông báo về việc lưu trữ hồ sơ điện tử có chữ ký số",
    excerpt:
      "Từ ngày 01/07/2025, các tổ chức hành nghề công chứng phải thực hiện chuyển đổi hồ sơ công chứng giấy thành thông điệp dữ liệu để lưu trữ điện tử.",
    category: "Tin pháp luật",
    date: "15/07/2025",
    image: imgSlider03,
    content: `Từ ngày 01/07/2025, theo Điều 59 104/2025/NĐ-CP, các tổ chức hành nghề công chứng phải thực hiện chuyển đổi hồ sơ công chứng giấy thành thông điệp dữ liệu để lưu trữ điện tử.

🏢 Văn phòng Công chứng Châu Á – ASN đã triển khai đầy đủ:
✅ Lưu trữ hồ sơ công chứng thành dữ liệu điện tử.
✅ Xác nhận bằng chữ ký số theo quy định pháp luật trước khi lưu trữ.
✅ Lưu trữ an toàn, bảo mật, đúng thời hạn theo quy định.

Việc này cũng thể hiện ASN luôn cập nhật nhanh chóng, vận hành đúng quy định và không ngừng nâng cao chất lượng phục vụ trong kỷ nguyên số.`,
  },
  {
    id: 6,
    slug: "asn-tiep-nhan-cong-chung-bat-dong-san-binh-duong-ba-ria-vung-tau",
    title:
      "ASN tiếp nhận công chứng tất cả giao dịch liên quan đến bất động sản tại tỉnh Bình Dương (cũ) & tỉnh Bà Rịa - Vũng Tàu (cũ)",
    excerpt:
      "Kể từ ngày 01/07/2025, toàn bộ địa bàn tỉnh Bình Dương (cũ) và tỉnh Bà Rịa - Vũng Tàu (cũ) đã sáp nhập vào Thành phố Hồ Chí Minh.",
    category: "Tin tổng hợp",
    date: "11/07/2025",
    image: imgSlider05,
    content: `Kể từ ngày 01/07/2025, theo Nghị quyết mới về việc điều chỉnh địa giới hành chính, toàn bộ địa bàn tỉnh Bình Dương (cũ) và tỉnh Bà Rịa - Vũng Tàu (cũ) đã sáp nhập vào Thành phố Hồ Chí Minh.

👉 Điều này đồng nghĩa:
Tất cả các giao dịch liên quan đến Bất động sản tại hai khu vực trên hiện đã thuộc phạm vi công chứng hợp pháp của ASN!

Kính mời Quý Khách hàng, Đối tác có nhu cầu công chứng giao dịch bất động sản tại Bình Dương (cũ) & Bà Rịa – Vũng Tàu (cũ) vui lòng liên hệ Văn phòng Công chứng Châu Á – ASN để được hỗ trợ nhanh chóng, chính xác và tận tình nhất nhé!`,
  },
  {
    id: 7,
    slug: "asn-chinh-thuc-su-dung-mau-dau-moi-tu-01-07-2025",
    title: "ASN đã chính thức sử dụng mẫu dấu mới từ ngày 01/07/2025",
    excerpt:
      "Văn phòng Công chứng Châu Á – ASN đã được cấp đổi con dấu mới để sử dụng và có giá trị sử dụng từ ngày 01/07/2025.",
    category: "Tin tổng hợp",
    date: "02/07/2025",
    image: imgNewsConDau2,
    content: `Văn phòng Công chứng Châu Á – ASN đã được Phòng Cảnh sát quản lý hành chính về trật tự xã hội Công an TP.HCM cấp đổi con dấu mới để sử dụng và có giá trị sử dụng từ ngày 01/07/2025.

Vì vậy, từ ngày 01/07/2025, mọi giao dịch công chứng tại ASN đều được thực hiện bình thường, nhanh chóng, với mẫu dấu mới hợp lệ.

✅ Đội ngũ tại ASN luôn sẵn sàng phục vụ Quý khách hàng liên tục, không gián đoạn.
✅ Mọi thủ tục, hợp đồng, chứng thực vẫn diễn ra trơn tru như thường lệ.

Cảm ơn Quý khách đã luôn tin tưởng và lựa chọn ASN là điểm đến pháp lý đáng tin cậy!`,
  },
  {
    id: 8,
    slug: "viec-cong-chung-phai-thuc-hien-tai-tru-so-to-chuc-hanh-nghe-cong-chung",
    title:
      "Việc công chứng phải được thực hiện tại trụ sở của tổ chứng hành nghề công chứng (Áp dụng từ ngày 01/07/2025)",
    excerpt:
      "Từ ngày 01/07/2025, việc công chứng phải được thực hiện tại trụ sở của tổ chức hành nghề công chứng.",
    category: "Tin pháp luật",
    date: "25/06/2025",
    image: imgSlider01,
    extraImages: [imgSlider02],
    content: `Từ ngày 01/07/2025, việc công chứng phải được thực hiện tại trụ sở của tổ chức hành nghề công chứng. Tuy nhiên, vẫn có một số trường hợp đặc biệt được phép công chứng ngoài trụ sở. Hãy cùng xem hình bên dưới để nắm ngay thông tin này nhé!

(Theo Điều 46, Luật Công Chứng năm 2024)

Để đảm bảo đúng quy định và thủ tục nhanh gọn, hãy đến trực tiếp Văn phòng Công chứng Châu Á - ASN để được hỗ trợ công chứng, chúng tôi luôn sẵn sàng hỗ trợ Quý khách trong mọi giao dịch!`,
  },
];

export function getArticleBySlug(slug: string): NewsArticleData | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
