import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
/**
 * AES 加密解密
 * @author liubei
 *
 */
public class AES {
	/**
	 * 零填充加密实现
	 * @param content
	 * @param password
	 * @return
	 */
	public static byte[] encryptZerosPadding(String content, String password){
        try {
            Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
            int blockSize = cipher.getBlockSize();
            byte[] dataBytes = content.getBytes();
            int plaintextLength = dataBytes.length;
            if (plaintextLength % blockSize != 0) {
                plaintextLength = plaintextLength + (blockSize - (plaintextLength % blockSize));
            }
            byte[] plaintext = new byte[plaintextLength];
            System.arraycopy(dataBytes, 0, plaintext, 0, dataBytes.length);
            
            byte[] pwdBytes = password.getBytes();
            int len = pwdBytes.length;
            byte[] keyBytes = new byte[16];
            if (len > keyBytes.length){
            	len = keyBytes.length;
            }
            keyBytes=Arrays.copyOf(pwdBytes, len);
            
            SecretKeySpec keyspec = new SecretKeySpec(keyBytes, "AES");
            //IvParameterSpec ivspec = new IvParameterSpec(keyBytes);
            cipher.init(Cipher.ENCRYPT_MODE, keyspec);
            byte[] encrypted = cipher.doFinal(plaintext);
            return encrypted;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
	/**
	 * 0填充解密
	 * @param content
	 * @param password
	 * @return
	 * @throws Exception
	 */
    public static byte[] desEncrypt(String content, String password){
        try{
            byte[] pwdBytes = password.getBytes();
            int len = pwdBytes.length;
            byte[] keyBytes = new byte[16];
            if (len > keyBytes.length){
            	len = keyBytes.length;
            }
            Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
            SecretKeySpec keyspec = new SecretKeySpec(keyBytes, "AES");
            //IvParameterSpec ivspec = new IvParameterSpec(keyBytes);
            byte[] dataBytes = content.getBytes();
            int blockSize = cipher.getBlockSize();
            int plaintextLength = dataBytes.length;
            if (plaintextLength % blockSize != 0) {
                plaintextLength = plaintextLength + (blockSize - (plaintextLength % blockSize));
            }

            byte[] plaintext = new byte[plaintextLength];
            System.arraycopy(dataBytes, 0, plaintext, 0, dataBytes.length);
            cipher.init(Cipher.DECRYPT_MODE, keyspec);
            
            byte[] original = cipher.doFinal(plaintext);
            return original;
        }
        catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
	
	public static String byteToHexStr(byte[] bytes){
        String returnStr = "";
        if (bytes != null){
            for (int i = 0; i < bytes.length; i++){
                String hex = Integer.toHexString(bytes[i] & 0xFF); 
                if (hex.length() == 1) { 
                  hex = '0' + hex; 
                }
                returnStr+=hex;
            }
        }
        return returnStr;
    }

//	public static void main(String[] parm) {
//		String content = "this is orgin string";
//		String password = "123456789";
//		
//		// 加密
//		System.out.println("加密前：" + content);
//		byte[] encryptResult = encryptZerosPadding(content, password);
//		System.out.println("加密后：" + byteToHexStr(encryptResult));
//		// 解密
//		//byte[] decryptResult = desEncrypt(byteToHexStr(encryptResult), password);
//		//System.out.println("解密后：" + new String(decryptResult));
//	}

}
