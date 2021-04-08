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

import javafx.util.Pair;

/**
 * Servlet implementation class SendPersonList
 */
@WebServlet("/SendPersonList")
public class SendPersonList extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendPersonList() {
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
		
//		int NO_OF_ROWS_TO_GET = 12;
		
		try {
			Connection conn = GetConnection.connectToDB();
			
//			String pageInURL = request.getParameter("page");
//			int page = Integer.parseInt(pageInURL) * NO_OF_ROWS_TO_GET;
			
			Statement st = conn.createStatement();
//			String sql_statement = "SELECT * FROM medicine LIMIT " + page + ", " + NO_OF_ROWS_TO_GET;
			String sql_statement = "SELECT person_id, name FROM person";
			ResultSet rs = st.executeQuery(sql_statement);
						
			ArrayList<Pair<String, Integer>> data = new ArrayList<Pair<String, Integer>>();
			
			while(rs.next()) {				
				data.add(new Pair<String, Integer>(rs.getString("name"), rs.getInt("person_id")));
			}
//			
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
