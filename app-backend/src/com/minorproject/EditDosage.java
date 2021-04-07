package com.minorproject;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class EditDosage
 */
@WebServlet("/EditDosage")
public class EditDosage extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditDosage() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String dosage = null;
		
		try {
			BufferedReader reader = request.getReader();
			dosage = reader.readLine();
			System.out.println(dosage);
			
			dosage = dosage.substring(1, dosage.length() - 1);
			String final_values[] = dosage.split(",");
			
			for(int i = 0; i < final_values.length; ++i) {
				if(final_values[i].split(":")[1].charAt(0) == '\"') {
					final_values[i] = final_values[i].split("\":\"")[1];
					final_values[i] = final_values[i].substring(0, final_values[i].length() - 1);
				}
				else {
					final_values[i] = final_values[i].split(":")[1];
//					final_values[i] = final_values[i].substring(1, final_values[i].length() - 1);
				}
				System.out.println(final_values[i]);
			}
			
			int dosage_id = Integer.parseInt(final_values[0]);
			int dose = Integer.parseInt(final_values[1]);
			String frequency = final_values[2];
			String time1 = final_values[3];
			String time2 = final_values[4];
			String time3 = final_values[5];
			String notes = final_values[6];
			
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
	        ZoneId.of("Asia/Kolkata");
			
			if(!time1.isEmpty() && time1.length() > 8) {
				Instant time1_conversion = Instant.parse(time1);
				time1 = LocalDateTime.ofInstant(time1_conversion, ZoneId.of("Asia/Kolkata")).format(formatter);
			}
			
			if(!time2.isEmpty() && time2.length() > 8) {
				Instant time2_conversion = Instant.parse(time2);
				time2 = LocalDateTime.ofInstant(time2_conversion, ZoneId.of("Asia/Kolkata")).format(formatter);
			}
			
			if(!time3.isEmpty() && time3.length() > 8) {
				Instant time3_conversion = Instant.parse(time3);
				time3 = LocalDateTime.ofInstant(time3_conversion, ZoneId.of("Asia/Kolkata")).format(formatter);
			}
			
			System.out.println(time2 + " " + time2.getClass().getName());
		
			Connection conn = GetConnection.connectToDB();
			String sql_statement = "UPDATE dosage SET dose=?, frequency=?, time1=?, time2=?, time3=?, notes=? WHERE dosage_id=?";
			
			PreparedStatement st = conn.prepareStatement(sql_statement);
			st.setInt(1, dose);
			st.setString(2,  frequency);
			st.setString(3,  time1);
			st.setString(4,  time2.isEmpty() || time2.equals("null") ? null : time2);
			st.setString(5,  time3.isEmpty() || time3.equals("null") ? null : time3);
			st.setString(6,  notes.isEmpty() || notes.equals("null") ? null : notes);
			st.setInt(7,  dosage_id);
			
			System.out.println(st);
			
			st.executeUpdate();
			conn.close();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
//		catch (SQLException e) {
//			e.printStackTrace();
//		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}
