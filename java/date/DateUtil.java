import java.text.SimpleDateFormat;
import java.util.Date;



public class DateUtil {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SimpleDateFormat formatter, FORMATTER;
		Date date;
		formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		String oldDate = "2015-10-09T05:21:49.000Z";
		try{
			date = formatter.parse(oldDate);
			FORMATTER = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
		
		
			System.out.println("OldDate-->"+oldDate);
			System.out.println("NewDate-->"+FORMATTER.format(date));
		}catch(Exception e){
			
		}
	}

}
