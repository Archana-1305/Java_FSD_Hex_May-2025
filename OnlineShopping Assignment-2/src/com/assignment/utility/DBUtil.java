package com.assignment.utility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtil {
	
	private String url="jdbc:mysql://localhost:3306/ecom";
	private String userDB = "root";
	private String passDB = "Gv_1305*03"; 
	private String driver = "com.mysql.cj.jdbc.Driver";
	private Connection con;
	
	private static DBUtil db = new DBUtil();
	private DBUtil() { } 
	
	public static DBUtil getInstance() {
		return db;
	} 
	
	public Connection connect() {
		try {
			Class.forName(driver);
			con = DriverManager.getConnection(url, userDB, passDB);
		} catch (ClassNotFoundException e) {
			System.out.println(e.getMessage());
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		
		try {
			con =  DriverManager.getConnection(url, userDB, passDB);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		
		return con; 

		
	}
	
	public void close() {
		try {
			if(!con.isClosed())
				con.close();
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
	}

}
