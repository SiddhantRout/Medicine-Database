package com.minorproject;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class SendDataFromDosage
 */
@WebServlet("/SendDataFromDosage")
public class SendDataFromDosage extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendDataFromDosage() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		PrintWriter out = response.getWriter();
		
		try {
			Connection conn = GetConnection.connectToDB();
			
			Statement st = conn.createStatement();
			String sql_statement = "SELECT dosage_id, name, medicine, start_date, end_date, dose, frequency, time1, time2, time3, dosage.notes FROM dosage, person WHERE dosage.person = person.person_id";
			ResultSet rs = st.executeQuery(sql_statement);
			
			ArrayList<Dosage> data = new ArrayList<>();
			while(rs.next()) {
				Dosage d = new Dosage();
				d.setDosage_id(rs.getInt("dosage_id"));
				d.setPerson(rs.getString("name"));
				d.setMedicine(rs.getString("medicine"));
				d.setStart_date(rs.getString("start_date"));
				d.setEnd_date(rs.getString("end_date"));
				d.setDose(rs.getInt("dose"));
				d.setFrequency(rs.getString("frequency"));
				d.setTime1(rs.getString("time1"));
				d.setTime2(rs.getString("time2"));
				d.setTime3(rs.getString("time3"));
				d.setNotes(rs.getString("notes"));
				
				data.add(d);
			}
			
			Gson gson = new GsonBuilder().serializeNulls().create();
			String person = gson.toJson(data);
			out.print(person);
			response.setStatus(200);
			out.flush();
		}
		catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		catch(SQLException e) {
			e.printStackTrace();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
