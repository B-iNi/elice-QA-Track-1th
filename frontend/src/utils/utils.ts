export const date2time = (date: Date) => {
  return (
    `${date.getHours() < 10 ? "0" : ""}${date.getHours()}` +
    `:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`
  );
};

export const date2date = (date: Date) => {
  return (
    `${date.getFullYear()}` +
    `-${date.getMonth() < 9 ? "0" : ""}${date.getMonth() + 1}` +
    `-${date.getDate() < 10 ? "0" : ""}${date.getDate()}`
  );
};

export const datetime2str = (date: string, time: string) => {
  return `${date}T${time}`;
};

export const str2datetime = (str: string) => {
  const [date, rest] = str.split("T");
  const [time, _] = rest.split(".");
  return { date, time: time.substring(0, 5) };
};

export const utcDate2kstDate = (utcDateString: string) => {
  // UTC 문자열을 Date 객체로 변환
  const kstDate = new Date(utcDateString);

  // 변환된 날짜를 원하는 포맷으로 반환
  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(kstDate.getDate()).padStart(2, "0");
  const hours = String(kstDate.getHours()).padStart(2, "0");
  const minutes = String(kstDate.getMinutes()).padStart(2, "0");
  const seconds = String(kstDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const isAuthenticationRequired = (currentPath: string) => {
  const nonAuthenticatedPaths = ["/login", "/signup", "/"];

  return !nonAuthenticatedPaths.includes(currentPath);
};
