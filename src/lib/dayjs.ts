import dayjsMain from "dayjs";
import "dayjs/locale/pt-br";
import advancedFormat from "dayjs/plugin/advancedFormat";
import calendar from "dayjs/plugin/calendar";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import isYesterday from "dayjs/plugin/isYesterday";
import minMax from "dayjs/plugin/minMax";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjsMain.extend(advancedFormat);
dayjsMain.extend(calendar);
dayjsMain.extend(customParseFormat);
dayjsMain.extend(isBetween);
dayjsMain.extend(isSameOrAfter);
dayjsMain.extend(isSameOrBefore);
dayjsMain.extend(isToday);
dayjsMain.extend(isTomorrow);
dayjsMain.extend(isYesterday);
dayjsMain.extend(minMax);
dayjsMain.extend(relativeTime);
dayjsMain.extend(timezone);
dayjsMain.extend(utc);

dayjsMain.locale("pt-br");
dayjsMain.tz.setDefault("America/Sao_Paulo");

export const dayjs = dayjsMain;
