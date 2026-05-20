import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  FileSearch,
  HelpCircle,
  ShieldCheck,
  ClipboardList,
  Phone,
} from "lucide-react";

export type ChatbotAction =
  | {
      type: "navigate";
      label: string;
      href: string;
    }
  | {
      type: "modal";
      label: string;
      modal: "complaint";
    }
  | {
      type: "external";
      label: string;
      href: string;
    };

export interface ChatbotRule {
  id: string;
  question: string;
  category: "quick" | "service" | "support";
  answer: string[];
  icon: LucideIcon;
  action?: ChatbotAction;
}

export const chatbotRules: ChatbotRule[] = [
  {
    id: "book-appointment",
    question: "Tôi muốn đặt lịch hẹn",
    category: "quick",
    icon: CalendarCheck,
    answer: [
      "ASN có thể tiếp nhận lịch hẹn trực tuyến. Bạn chỉ cần để lại họ tên, số điện thoại, dịch vụ cần công chứng và ngày mong muốn.",
      "Sau khi gửi thông tin, văn phòng sẽ xác nhận lại trong khoảng 30 phút trong giờ làm việc.",
    ],
    action: {
      type: "navigate",
      label: "Mở trang đặt lịch",
      href: "/dat-lich",
    },
  },
  {
    id: "lookup-profile",
    question: "Tra cứu hồ sơ",
    category: "quick",
    icon: FileSearch,
    answer: [
      "ASN hỗ trợ kiểm tra tình trạng hồ sơ theo mã hồ sơ hoặc số điện thoại đã đăng ký.",
      "Vui lòng chuẩn bị thông tin liên quan, sau đó liên hệ hotline 079 992 1998 để nhân viên ASN kiểm tra và phản hồi tình trạng xử lý.",
    ],
    action: {
      type: "external",
      label: "Gọi hotline",
      href: "tel:0799921998",
    },
  },
  {
    id: "complaint",
    question: "Nộp khiếu nại",
    category: "quick",
    icon: ClipboardList,
    answer: [
      "ASN ghi nhận phản ánh về thái độ phục vụ, thời gian xử lý hồ sơ hoặc thông tin tư vấn chưa rõ ràng.",
      "Bạn có thể mở biểu mẫu bên dưới để gửi thông tin phản ánh. Bộ phận phụ trách sẽ kiểm tra và liên hệ lại trong thời gian sớm nhất.",
    ],
    action: {
      type: "modal",
      label: "Mở biểu mẫu khiếu nại",
      modal: "complaint",
    },
  },
  {
    id: "digital-id",
    question: "Hướng dẫn định danh điện tử",
    category: "quick",
    icon: ShieldCheck,
    answer: [
      "Khi đi công chứng, bạn có thể xuất trình CCCD gắn chip hoặc thông tin định danh điện tử hợp lệ theo quy định hiện hành.",
      "Nếu địa chỉ trên CCCD chưa cập nhật, giao dịch vẫn có thể được xem xét khi giấy tờ xuất trình hợp pháp và thông tin nhân thân được đối chiếu đầy đủ.",
    ],
  },
  {
    id: "required-documents",
    question: "Cần chuẩn bị giấy tờ gì?",
    category: "service",
    icon: HelpCircle,
    answer: [
      "Thông thường bạn cần CCCD/Hộ chiếu còn hiệu lực của các bên, giấy tờ chứng minh tình trạng hôn nhân, giấy tờ về tài sản hoặc hợp đồng liên quan.",
      "Với từng loại giao dịch, nhân viên ASN sẽ kiểm tra và hướng dẫn bổ sung hồ sơ cụ thể trước khi ký công chứng.",
    ],
  },
  {
    id: "working-hours",
    question: "Giờ làm việc của ASN",
    category: "support",
    icon: Phone,
    answer: [
      "ASN làm việc từ thứ hai đến thứ sáu: 08:00-12:00 và 13:00-17:00. Thứ bảy làm việc buổi sáng từ 08:00-12:00.",
      "Bạn có thể gọi (028) 39 300 903 hoặc 079 992 1998 để được hỗ trợ nhanh hơn.",
    ],
    action: {
      type: "external",
      label: "Gọi ASN",
      href: "tel:02839300903",
    },
  },
];

export const quickChatbotRules = chatbotRules.filter(
  (rule) => rule.category === "quick",
);
